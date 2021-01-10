import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";

let getProfileRefreshing = false;

export const getCurrentProfile = () => async dispatch => {

    if (getProfileRefreshing)
        return;
    getProfileRefreshing = true;
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };

    try {
        const res = await axios.get(
            `/auth/current`,
            config
        );
        dispatch({
            type: GET_PROFILE,
            payload: res.data.principal
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        });
    }
    getProfileRefreshing = false;
};