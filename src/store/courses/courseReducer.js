import {GET_ACTIVITY_TYPES, GET_ACTIVITY_TYPES_ERROR} from "./courseActions";


const initialState = {

    activities: [],
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ACTIVITY_TYPES:
            return {
                ...state,
                activities: payload
            };
        case GET_ACTIVITY_TYPES_ERROR:
            return {
                ...state,
                errors: payload
            };
        default:
            return state;
    }
}