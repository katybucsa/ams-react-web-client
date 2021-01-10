import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import * as qs from "qs";
import {GET_PROFILE} from "../profile/profileActions";
import {toast} from "react-toastify";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

let loginRefreshing = false;

export const loadUser = () => async dispatch => {
    if (localStorage.access_token) {
        setAuthToken(localStorage.access_token);
    }
    try {
        dispatch({
            type: USER_LOADED
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const login = (username, password) => async dispatch => {

    if (loginRefreshing)
        return;
    loginRefreshing = true;
    const config = {
        headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `Basic ${btoa('mobile:pecai98')}`
        }
    };
    const data = qs.stringify({
        username: username,
        password: password,
        grant_type: 'password'
    });

    try {
        const res = await axios.post("/auth/oauth/token", data, config);
        setAuthToken(res.data.access_token);
        const details = await axios.get("/auth/current");
        res.data.role = details.data.principal.roles[0].name;
        res.data.user = details.data.principal.name;
        await dispatch({
            type: GET_PROFILE,
            payload: details.data.principal
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const status = err.response.status;

        if (status === 400) {
            toast.error("Username or password invalid");
        } else {
            toast.warn("Try again");
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: err
        });
    }
    loginRefreshing = false;
};

export const dispatchOnRefreshToken = (res) => async dispatch => {

    dispatch({
        type: LOGIN_SUCCESS,
        payload: res
    });
    dispatch(loadUser());
};

export const logout = () => dispatch => {

    dispatch({type: LOGOUT});
};
