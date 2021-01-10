import {ASSIGN_GRADE_PRESSED, DRAWER_WIDTH_OPEN} from "./communicationActions";
import {ERROR_GRADE_ASSIGNED, GRADE_ASSIGNED, REFRESH_STATE} from "../student/studentActions";

const initialState = {
    isOpen: false,
    assignPressed: false,
    gradeAssigned: false,
    errorGradeAssigned: false
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case DRAWER_WIDTH_OPEN:
            return {
                ...state,
                isOpen: payload
            };
        case ASSIGN_GRADE_PRESSED:
            return {
                ...state,
                assignPressed: true
            };
        case GRADE_ASSIGNED:
            return {
                ...state,
                gradeAssigned: true
            };
        case ERROR_GRADE_ASSIGNED:
            return {
                ...state,
                assignPressed: false,
                gradeAssigned: false,
                errorGradeAssigned: true
            };
        case REFRESH_STATE:
            return {
                ...state,
                assignPressed: false,
                gradeAssigned: false,
                errorGradeAssigned: false
            };
        default:
            return state;
    }
}