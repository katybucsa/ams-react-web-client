import axios from "axios";

export const GET_PROFESSOR_COURSES = "GET_PROFESSOR_COURSES";
export const GET_PROFESSOR_COURSES_FAIL = "GET_PROFESSOR_COURSES_FAIL";

let getProfessorCoursesRefreshing = false;

export const getProfessorCourses = () => async dispatch => {

    if (getProfessorCoursesRefreshing)
        return;
    getProfessorCoursesRefreshing = true;
    try {
        const courses = await axios.get("/course/");


        dispatch({
            type: GET_PROFESSOR_COURSES,
            payload: courses.data.data
        });
    } catch (err) {
        dispatch({
            type: GET_PROFESSOR_COURSES_FAIL,
            payload: err
        });
    }
    getProfessorCoursesRefreshing = false;
};