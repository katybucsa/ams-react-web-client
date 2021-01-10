import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./authActions";

const initialState = {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    role: localStorage.getItem("role"),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: ""
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: !!localStorage.getItem("access_token"),
                loading: false
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("access_token", payload.access_token);
            localStorage.setItem("refresh_token", payload.refresh_token);
            localStorage.setItem("role", payload.role);
            localStorage.setItem("user", payload.user);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case LOGOUT:
            localStorage.removeItem('subscribed');
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            return {
                ...state,
                access_token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}
