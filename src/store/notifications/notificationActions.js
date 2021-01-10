import axios from "axios";

export const GET_NOT_SEEN_NOTIFS = "GET_NOT_SEEN_NOTIFS";
export const GET_NOTIFS_ERROR = "GET__NOTIFS_ERROR";
export const GET_USER_NOTIFS = "GET_USER_NOTIFS";
export const SET_NR_NOTIF = "SET_NR_NOTIF";

let getUserNotifsRefreshing = false;

export const getNotSeenNotifs = () => async dispatch => {


    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };

    try {
        const res = await axios.get(`/notification/notifs/nr`, config);

        dispatch({
            type: GET_NOT_SEEN_NOTIFS,
            payload: res.data.nr
        });
    } catch (err) {

        dispatch({
            type: GET_NOTIFS_ERROR,
            payload: err
        });
    }
};


export const getUserNotifs = () => async dispatch => {

    if (getUserNotifsRefreshing)
        return;
    getUserNotifsRefreshing = true;
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };

    try {
        const res = await axios.get(`/notification/notifs`, config);

        dispatch({
            type: GET_USER_NOTIFS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: GET_NOTIFS_ERROR,
            payload: err
        });
    }
    getUserNotifsRefreshing = false;
};

export const setNotifNr = (notifNr) => async dispatch => {

    dispatch({
        type: SET_NR_NOTIF,
        payload: notifNr
    });
};