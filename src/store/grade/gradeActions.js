import axios from "axios";

export const GET_GRADES_BY_STUDENT = "GET_GRADES_BY_STUDENT";
export const GET_GRADES_BY_STUDENT_ERROR = "GET_GRADES_BY_STUDENT_ERROR";

export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";

let getGradesByStudentRefreshing = false;

export const getGradesByStudent = (courseId) => async dispatch => {

    if (getGradesByStudentRefreshing)
        return;
    getGradesByStudentRefreshing = true;

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };

    try {
        const res = await axios.get(`/assignment/grades?courseId=${courseId}`, config);

        dispatch({
            type: GET_GRADES_BY_STUDENT,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: GET_GRADES_BY_STUDENT_ERROR,
            payload: err
        });
    }
    getGradesByStudentRefreshing = false;
};