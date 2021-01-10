import {GET_STUDENT_COURSES, GET_STUDENT_COURSES_FAIL} from "./studentCourseActions";

const initialState = {

    access_token: localStorage.getItem("access_token"),
    isAuthenticated: null,
    loading: true,
    data: []
};

export default function (state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        case GET_STUDENT_COURSES:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case GET_STUDENT_COURSES_FAIL:
        default:
            return state;
    }
}