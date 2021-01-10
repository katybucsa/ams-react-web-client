import React from "react";
import DataTable from "react-data-table-component";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {getGradesByStudent} from "../../../store/grade/gradeActions";
import clsx from "clsx";
import {useStyles} from "../../../styles/styles";

const columns = [
    {
        name: "Course",
        selector: "course",
        sortable: true
    },
    {
        name: "Activity type",
        selector: "activityType",
        sortable: true
    },
    {
        name: "Value",
        selector: "value",
        sortable: true
    }
];

const GradesTable = ({
                         getGradesByStudent,
                         isAuthenticated,
                         grades,
                         match,
                         loading,
                         open
                     }) => {
    const courseId = match.params.cId;
    const classes = useStyles();
    if (loading) {
        getGradesByStudent(courseId);
    }
    if (!isAuthenticated) {
        return <Redirect to="/login"/>;
    }
    return <main
        className={clsx(classes.content, {
            [classes.contentShift]: open
        })}
    >
        <DataTable title="My grades" columns={columns} data={grades}/>
    </main>;
};
GradesTable.propTypes = {
    getGradesByStudent: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    grades: PropTypes.array
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    grades: state.grade.data,
    loading: state.grade.loading,
    open: state.communication.isOpen,
});

export default connect(mapStateToProps, {getGradesByStudent})(GradesTable);