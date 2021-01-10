import {REFRESH_STATE} from "../student/studentActions";

export const DRAWER_WIDTH_OPEN = "DRAWER_WIDTH_OPEN";
export const ASSIGN_GRADE_PRESSED = "ASSIGN_GRADE_PRESSED";


export const setOpen = (isOpen) => async dispatch => {

    dispatch({
        type: DRAWER_WIDTH_OPEN,
        payload: isOpen
    });
};

export const gradeFormClosed = () => async dispatch => {

    dispatch({
        type: REFRESH_STATE,
    })
};