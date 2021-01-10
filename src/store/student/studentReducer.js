import {GET_GROUPS, GET_REQUEST_FAIL, GET_STUDENTS} from './studentActions';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    data: []
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_STUDENTS:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case GET_GROUPS:
            return {
                ...state,
                loading: false,
                groups: payload
            };
        case GET_REQUEST_FAIL:
        default:
            return state;

    }
}