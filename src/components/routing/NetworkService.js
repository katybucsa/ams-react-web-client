import axios from 'axios';
import * as qs from "qs";
import {dispatchOnRefreshToken, logout} from "../../store/auth/authActions";
import {toast} from "react-toastify";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


export default {

    setupInterceptors: (dispatch) => {

        axios.interceptors.response.use(
            response => {
                return response;
            },
            err => {
                const originalRequest = err.config;
                console.log("Network service");
                if (err.response.status === 401 && err.config && !originalRequest._retry) {
                    if (isRefreshing) {
                        return new Promise(function (resolve, reject) {
                            failedQueue.push({resolve, reject});
                        })
                            .then(token => {
                                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                                return axios(originalRequest);
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;


                    return new Promise(function (resolve, reject) {

                        const data = qs.stringify({
                            grant_type: 'refresh_token',
                            refresh_token: localStorage.getItem('refresh_token'),
                            username: localStorage.getItem('user'),
                            clientId: 'mobile',
                            clientSecret: 'pecai98'
                        });

                        fetch('http://localhost:8080/auth/refresh', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                                // "Authorization": `Basic ${btoa('mobile:pecai98')}`
                            },
                            body: data,
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                }
                                return response.json();
                            })
                            .then(data => {

                                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                                dispatch(dispatchOnRefreshToken(data));
                                originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                                processQueue(null, data.access_token);
                                resolve(axios(originalRequest));
                            })
                            .catch(err => {
                                processQueue(err, null);
                                toast.warn("Session expired. You have to log in again.");
                                dispatch(logout());
                                reject(err);
                            })
                            .then(() => {
                                isRefreshing = false;
                            });
                    });
                }

                return Promise.reject(err);
            }
        );
    }
};