import {
    ASSIGN_NOT_RUNNING,
    ASSIGN_RUNNING,
    ATT_NOT_RUNNING,
    ATT_RUNNING,
    AUTH_NOT_RUNNING,
    AUTH_RUNNING,
    COURSE_NOT_RUNNING,
    COURSE_RUNNING,
    GAT_NOT_RUNNING,
    GAT_RUNNING,
    NOTIF_NOT_RUNNING,
    NOTIF_RUNNING, STUD_NOT_RUNNING,
    STUD_RUNNING
} from "./adminActions";

const initialState = {
    authRunning: false,
    authLoading: true,
    assignRunning: false,
    assignLoading: true,
    attRunning: false,
    attLoading: true,
    courseRunning: false,
    courseLoading: true,
    gatRunning: true,
    gatLoading: false,
    notifRunning: false,
    notifLoading: true,
    studRunning: false,
    studLoading: true,
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case AUTH_RUNNING:
            return {
                ...state,
                authLoading: false,
                authRunning: true
            };
        case AUTH_NOT_RUNNING:
            return {
                ...state,
                authLoading: false,
                authRunning: false
            };
        case ASSIGN_RUNNING:
            return {
                ...state,
                assignLoading: false,
                assignRunning: true
            };
        case ASSIGN_NOT_RUNNING:
            return {
                ...state,
                assignLoading: false,
                assignRunning: false
            };
        case ATT_RUNNING:
            return {
                ...state,
                attLoading: false,
                attRunning: true
            };
        case ATT_NOT_RUNNING:
            return {
                ...state,
                attLoading: false,
                attRunning: false
            };
        case COURSE_RUNNING:
            return {
                ...state,
                courseLoading: false,
                courseRunning: true
            };
        case COURSE_NOT_RUNNING:
            return {
                ...state,
                courseLoading: false,
                courseRunning: false
            };
        case GAT_RUNNING:
            return {
                ...state,
                gatLoading: false,
                gatRunning: true
            };
        case GAT_NOT_RUNNING:
            return {
                ...state,
                gatLoading: false,
                gatRunning: false
            };
        case NOTIF_RUNNING:
            return {
                ...state,
                notifLoading: false,
                notifRunning: true
            };
        case NOTIF_NOT_RUNNING:
            return {
                ...state,
                notifLoading: false,
                notifRunning: false
            };
        case STUD_RUNNING:
            return {
                ...state,
                studLoading: false,
                studRunning: true
            };
        case STUD_NOT_RUNNING:
            return {
                ...state,
                studLoading: false,
                studRunning: false
            };
        default:
            return {
                ...state
            };
    }
}