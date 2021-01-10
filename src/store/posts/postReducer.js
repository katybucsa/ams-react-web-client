import {
    ADD_PARTICIPATION,
    ADD_POST_ERROR,
    ERROR,
    GET_COURSE_POSTS, GET_EVENT_PARTICIPATIONS,
    GET_EVENTS_PARTICIPATIONS,
    GET_POSTS_ERROR,
    POST_ADDED
} from "./postActions";

const initialState = {

    isAuthenticated: null,
    loading: true,
    data: [],
    participations: [],
    partLoading: true,
    allPostParticip: [],
    allParticipLoading: true
};

export default function (state = initialState, action) {

    const {type, payload} = action;

    switch (type) {
        case GET_EVENT_PARTICIPATIONS:
            return {
                ...state,
                allPostParticip: payload,
                allParticipLoading: false
            };
        case GET_COURSE_POSTS:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case POST_ADDED:
            return {
                ...state,
                loading: true
            };
        case GET_EVENTS_PARTICIPATIONS:
            return {
                ...state,
                participations: payload,
                partLoading: false
            };
        case ADD_PARTICIPATION:
            return {
                ...state,
                partLoading: true
            };
        case ADD_POST_ERROR:
        case GET_POSTS_ERROR:
        case ERROR:
        default:
            return state;
    }
};