import axios from "axios";
import {toast} from "react-toastify";

export const GET_COURSE_POSTS = "GET_COURSE_POSTS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";
export const GET_POSTS_ERROR = "GET_POSTS_ERROR";
export const POST_ADDED = "POST_ADDED";
export const GET_EVENTS_PARTICIPATIONS = "GET_EVENTS_PARTICIPATIONS";
export const ERROR = "ERROR";
export const ADD_PARTICIPATION = "ADD_PARTICIPATION";
export const GET_EVENT_PARTICIPATIONS = "GET_EVENT_PARTICIPATIONS";

let getPostsRefreshing = false;
let addPostRefreshing = false;
let getParticipationsRefreshing = false;
let addParticipationRefreshing = false;

export const getPosts = (courseId) => async dispatch => {

    if (getPostsRefreshing)
        return;
    getPostsRefreshing = true;

    const config = {
        headers: {Authorization: `Bearer ${localStorage.access_token}`}
    };
    try {
        const res = await axios.get(`/course/${courseId}/posts`, config);
        dispatch({
            type: GET_COURSE_POSTS,
            payload: res.data.data
        })
    } catch (e) {
        toast.error("Could not get course posts!");
        dispatch({type: GET_POSTS_ERROR, payload: e.response});
    }
    getPostsRefreshing = false;
};

export const addPost = (postData, courseId, history) => async dispatch => {

    if (addPostRefreshing)
        return;
    addPostRefreshing = true;
    const config = {
        headers: {
            "content-type": "application/json;charset=utf-8",
        }
    };

    const body = JSON.stringify(postData);
    try {
        const res = await axios.post(`/course/${courseId}/posts`, body, config);
        if (res) {
            toast.success("Post added successfully!");
            dispatch({
                type: POST_ADDED
            });
            history.push(`/course/${courseId}/posts`);
        }
    } catch (e) {
        toast.error("Invalid post data!");
        dispatch({type: ADD_POST_ERROR, payload: e.response.data});
    }
    addPostRefreshing = false;
};


export const getParticipations = (courseId) => async dispatch => {

    if (getParticipationsRefreshing)
        return;
    getParticipationsRefreshing = true;
    const config = {
        headers: {Authorization: `Bearer ${localStorage.access_token}`}
    };
    try {
        const res = await axios.get(`/course/${courseId}/events/participations`, config);
        if (res) {
            dispatch({
                type: GET_EVENTS_PARTICIPATIONS,
                payload: res.data.data
            });
        }
    } catch (e) {

        dispatch({
            type: ERROR
        });
    }
    getParticipationsRefreshing = false;
};

export const addParticipation = (postData, courseId, history) => async dispatch => {

    if (addParticipationRefreshing)
        return;
    addParticipationRefreshing = true;
    const config = {
        headers: {
            "content-type": "application/json;charset=utf-8",
        }
    };
    const body = JSON.stringify(postData);
    try {
        const res = await axios.post(`/course/${courseId}/events/participations`, body, config);
        if (res) {
            dispatch({
                type: ADD_PARTICIPATION,
            });
            history.push(`/course/${courseId}/posts`);
        }
    } catch (e) {
        dispatch({
            type: ERROR
        });
    }
    addParticipationRefreshing = false;
};


export const getEventParticipants = (courseId,postId) => async dispatch => {

    try {
        const res = await axios.get(`/course/${courseId}/events/${postId}/participations`);
        if (res) {
            dispatch({
                type: GET_EVENT_PARTICIPATIONS,
                payload: res.data.data
            });
        }
    } catch (e) {
        dispatch({
            type: ERROR
        });
    }
};

