import axios from "axios";

export const GET_STUDENT_COURSES = "GET_STUDENT_COURSES";
export const GET_STUDENT_COURSES_FAIL = "GET_STUDENT_COURSES_FAIL";
let coursesRefreshing = false;

export const getStudentCourses = () => async dispatch => {

    if (coursesRefreshing) {
        return;
    }
    coursesRefreshing = true;
    try {
        const queryS = {
            query: `query {
                    enrollments { 
                        data
                  }
          }`
        };

        const coursesIds = await axios.post("student/graphql", queryS);
        const queryC = {
            query: `query($idsList:[String]!) {
            courses (coursesIds: $idsList) { 
                id
                name
                credits
                specId
                year
            }
          }`, variables: {
                idsList: coursesIds.data.data.enrollments.data
            }
        };

        const res = await axios.post("course/graphql", queryC);
        dispatch({
            type: GET_STUDENT_COURSES,
            payload: res.data.data.courses
        });
    } catch (err) {
        dispatch({
            type: GET_STUDENT_COURSES_FAIL,
            payload: err
        });
    }
    coursesRefreshing = false;
};
