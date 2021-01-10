
import { GET_PROFILE, PROFILE_ERROR } from "./profileActions";

const initialState = {
    profile: null,
    role: localStorage.getItem("role"),
    username: localStorage.getItem("user"),
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}