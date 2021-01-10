import {
    GET_GRADES_BY_STUDENT,
    GET_GRADES_BY_STUDENT_ERROR,
    GET_REQUEST_FAIL
} from "./gradeActions";

const initialState = {
    token: localStorage.getItem("access_token"),
    isAuthenticated: null,
    loading: true,
    data: [],
    error: {}
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_GRADES_BY_STUDENT:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case GET_GRADES_BY_STUDENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_REQUEST_FAIL:
        default:
            return state;
    }
}