import axios from "axios";
import {toast} from "react-toastify";

export const SERVICE_STOPPED = "SERVICE_STOPPED";
export const ERROR_STOPPING_SERVICE = "ERROR_STOPPING_SERVICE";

export const AUTH_RUNNING = "AUTH_RUNNING";
export const AUTH_NOT_RUNNING = "AUTH_NOT_RUNNING";
export const ASSIGN_RUNNING = "ASSIGN_RUNNING";
export const ASSIGN_NOT_RUNNING = "ASSIGN_NOT_RUNNING";
export const ATT_RUNNING = "ATT_RUNNING";
export const ATT_NOT_RUNNING = "ATT_NOT_RUNNING";
export const COURSE_RUNNING = "COURSE_RUNNING";
export const COURSE_NOT_RUNNING = "COURSE_NOT_RUNNING";
export const GAT_RUNNING = "GAT_RUNNING";
export const GAT_NOT_RUNNING = "GAT_NOT_RUNNING";
export const NOTIF_RUNNING = "NOTIF_RUNNING";
export const NOTIF_NOT_RUNNING = "NOTIF_NOT_RUNNING";
export const STUD_RUNNING = "STUD_RUNNING";
export const STUD_NOT_RUNNING = "STUD_NOT_RUNNING";

let stopServiceRefreshing = false;
let callServiceRefreshing = false;

export const stopOneService = (service) => async dispatch => {

    if (stopServiceRefreshing)
        return;
    stopServiceRefreshing = true;
    let port = 8081;
    let typE = AUTH_NOT_RUNNING;

    if (service === 'assignment') {
        port = 8084;
        typE = ASSIGN_NOT_RUNNING;
    }
    if (service === 'course') {
        port = 8083;
        typE = COURSE_NOT_RUNNING;
    }
    if (service === 'gateway') {
        port = 8080;
        typE = GAT_NOT_RUNNING;
    }
    if (service === 'notification') {
        port = 8085;
        typE = NOTIF_NOT_RUNNING;
    }
    if (service === 'student') {
        port = 8086;
        typE = STUD_NOT_RUNNING;
    }
    let url;
    if (service === 'gateway') {
        url = `http://localhost:${port}/actuator/shutdown`;
    } else {
        url = `http://localhost:${port}/${service}/actuator/shutdown`;
    }
    try {
        await axios.post(url, {});
        toast.success("Service stopped successfully");
        dispatch({
            type: typE,
        });
    } catch (e) {
        toast.error("Could not shutdown service! Try again.");
        dispatch({
            type: ERROR_STOPPING_SERVICE
        });
    }
    stopServiceRefreshing = false;
};

export const callService = (service) => async dispatch => {

    callServiceRefreshing=true;
    const url = `/${service}/running`;
    let typS = AUTH_RUNNING;
    let typE = AUTH_NOT_RUNNING;
    if (service === 'assignment') {
        typS = ASSIGN_RUNNING;
        typE = ASSIGN_NOT_RUNNING;
    }
    if (service === 'course') {
        typS = COURSE_RUNNING;
        typE = COURSE_NOT_RUNNING;
    }
    if (service === 'gateway') {
        typS = GAT_RUNNING;
        typE = GAT_NOT_RUNNING;
    }
    if (service === 'notification') {
        typS = NOTIF_RUNNING;
        typE = NOTIF_NOT_RUNNING;
    }
    if (service === 'student') {
        typS = STUD_RUNNING;
        typE = STUD_NOT_RUNNING;
    }
    try {
        await axios.get(url);

        dispatch({
            type: typS,
        });
    } catch (e) {
        console.log("error " + service);
        dispatch({
            type: typE
        });
    }
};

export const changeServiceState = (service, stateType) => async dispatch => {

    let typS = AUTH_RUNNING;
    let typE = AUTH_NOT_RUNNING;
    if (service === 'assignment') {
        typS = ASSIGN_RUNNING;
        typE = ASSIGN_NOT_RUNNING;
    }
    if (service === 'course') {
        typS = COURSE_RUNNING;
        typE = COURSE_NOT_RUNNING;
    }
    if (service === 'gateway') {
        typS = GAT_RUNNING;
        typE = GAT_NOT_RUNNING;
    }
    if (service === 'notification') {
        typS = NOTIF_RUNNING;
        typE = NOTIF_NOT_RUNNING;
    }
    if (service === 'student') {
        typS = STUD_RUNNING;
        typE = STUD_NOT_RUNNING;
    }
    if (stateType === 'running') {
        dispatch({
            type: typS
        });
    }
    if (stateType === 'error') {
        dispatch({
            type: typE
        });
    }
};

