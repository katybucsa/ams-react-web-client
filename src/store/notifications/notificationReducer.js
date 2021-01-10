import {
    GET_NOT_SEEN_NOTIFS,
    GET_NOTIFS_ERROR,
    GET_USER_NOTIFS,
    SET_NR_NOTIF
} from "./notificationActions";

const initialState = {

    notifNotSeen: 0,
    data: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_NOT_SEEN_NOTIFS:
            return {
                ...state,
                loading: false,
                notifNotSeen: payload
            };
        case GET_USER_NOTIFS:
            return {
                ...state,
                data: payload
            };
        case GET_NOTIFS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_NR_NOTIF:
            return {
                ...state,
                notifNotSeen: payload
            };
        default:
            return state;
    }
}