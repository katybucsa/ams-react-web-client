import axios from "axios";

export const GET_ACTIVITY_TYPES = "GET_ACTIVITY_TYPES";
export const GET_ACTIVITY_TYPES_ERROR = "GET_ACTIVITY_TYPES_ERROR";

let getActivityTypesRefreshing = false;

export const getActivityTypes = () => async dispatch => {
    if (getActivityTypesRefreshing)
        return;
    getActivityTypesRefreshing = true;
    try {
        const res = await axios.get(
            `/course/activity-types`
        );

        dispatch({
            type: GET_ACTIVITY_TYPES,
            payload: res.data.data
        });
    } catch (error) {
        dispatch({type: GET_ACTIVITY_TYPES_ERROR, payload: error});
    }
    getActivityTypesRefreshing = false;
};