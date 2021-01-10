import {combineReducers} from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import professorCourses from "./courses/professorCourseReducer";
import studentCourses from "./courses/studentCourseReducer";
import communication from "./communication/communicationReducer"
import post from "./posts/postReducer"
import admin from "./admin/adminReducer"
import student from "./student/studentReducer"
import profile from "./profile/profileReducer"
import activity from "./courses/courseReducer"
import grade from "./grade/gradeReducer"
import notification from "./notifications/notificationReducer"


export default combineReducers({
    alert,
    auth,
    studentCourses,
    professorCourses,
    communication,
    post,
    admin,
    student,
    profile,
    activity,
    grade,
    notification
});
