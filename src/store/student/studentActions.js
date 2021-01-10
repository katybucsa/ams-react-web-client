import axios from "axios";
import {setAlert} from "../alert/alertActions";
import {toast} from "react-toastify";
import {ASSIGN_GRADE_PRESSED} from "../communication/communicationActions";

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_GROUPS = "GET_GROUPS";
export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
export const ADD_GRADE = "ADD_GRADE";
export const GRADE_ASSIGNED = "GRADE_ASSIGNED";
export const REFRESH_STATE = "REFRESH_STATE";
export const ERROR_GRADE_ASSIGNED = "ERROR_GRADE_ASSIGNED";

let assignGradeRefreshing = false;
let getStudentsRefreshing = false;
let getGroupsRefreshing = false;

export const assignGrade = (
    studentId,
    courseId,
    typeId,
    grade
) => async dispatch => {

    if (assignGradeRefreshing)
        return;
    assignGradeRefreshing = true;
    const body = {
        student: studentId,
        courseId: courseId,
        value: grade,
        typeId: typeId
    };
    try {
        dispatch({
            type: ASSIGN_GRADE_PRESSED
        });
        const res = await axios.post(
            "/assignment/grades",
            body
        );
        toast.success("Grade assigned successfully");
        dispatch({
            type: ADD_GRADE,
            payload: res.data
        });
        dispatch({
            type: GRADE_ASSIGNED
        });
    } catch (err) {
        const status = err.response.status;
        if (status === 404) {
            dispatch(setAlert("Group doesn't exists", "danger"));
        }
        if (status === 400 || status === 500) {
            toast.error("Service was unavailable! Grade not assigned! Try again");
        }
        dispatch({
            type: GET_REQUEST_FAIL,
            payload: err
        });
        dispatch({
            type: ERROR_GRADE_ASSIGNED
        });
    }
    assignGradeRefreshing = false;
};

export const getStudents = (courseId, groupId) => async dispatch => {

    if (getStudentsRefreshing)
        return;
    getStudentsRefreshing = true;
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };

    try {
        const res = await axios.get(
            `/student?courseId=${courseId}&groupId=${groupId}`,
            config
        );
        dispatch({
            type: GET_STUDENTS,
            payload: res.data.data
        });
    } catch (err) {
        const status = err.response.status;
        if (status === 404) {
            dispatch(setAlert("Group doesn't exists", "danger"));
        }
        if (status === 400) {
            dispatch(setAlert("Try again", "danger"));
        }
        dispatch({
            type: GET_REQUEST_FAIL,
            payload: err
        });
    }
    getStudentsRefreshing = false;
};
export const getGroups = specId => async dispatch => {
    if (getGroupsRefreshing)
        return;
    getGroupsRefreshing = true;
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
        }
    };

    try {
        const res = await axios.get(`/student/groups?specId=${specId}`, config);

        dispatch({
            type: GET_GROUPS,
            payload: res.data.data
        });
    } catch (err) {
        const status = err.response.status;
        if (status === 404) {
            dispatch(setAlert("Group doesn't exists", "danger"));
        }
        if (status === 400) {
            dispatch(setAlert("Try again", "danger"));
        }
        dispatch({
            type: GET_REQUEST_FAIL,
            payload: err
        });
    }
    getGroupsRefreshing = false;
};