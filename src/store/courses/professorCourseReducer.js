import {GET_PROFESSOR_COURSES, GET_PROFESSOR_COURSES_FAIL} from "./professorCourseActions";

const initialState = {

    access_token: localStorage.getItem("access_token"),
    isAuthenticated: null,
    loading: true,
    data: []
};

export default function (state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        case GET_PROFESSOR_COURSES:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case GET_PROFESSOR_COURSES_FAIL:
        default:
            return state;
    }
}