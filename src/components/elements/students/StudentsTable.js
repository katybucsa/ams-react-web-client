import React, {useState} from "react";
import DataTable from "react-data-table-component";
import {connect} from "react-redux";
import {getGroups, getStudents} from "../../../store/student/studentActions";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import _ from "lodash";
import "./StudentsTable.css";
import TeacherStudentOptions from "./professorStudentOptions";
import clsx from "clsx";
import {useStyles} from "../../../styles/styles";

const columns = [
    {
        name: "Username",
        selector: "username",
        sortable: true,
        ignoreRowClick: true,
        width: "23%"
    },
    {
        name: "First Name",
        selector: "firstName",
        sortable: true,
        ignoreRowClick: true,
        width: "23%"
    },
    {
        name: "Last Name",
        selector: "lastName",
        sortable: true,
        ignoreRowClick: true,
        width: "23%"
    },
    {
        name: "Group Name",
        selector: "groupName",
        sortable: true,
        ignoreRowClick: true,
        width: "23%"
    },
    {
        selector: "options",
        sortable: false,
        center: true,
        width: "8%"
    }
];
const sortIcon = <ArrowDownward/>;

const StudentsTable = ({
                           getStudents,
                           isAuthenticated,
                           students,
                           loading,
                           getGroups,
                           groups,
                           match,
                           open
                       }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [groupId, setGroupId] = useState("");
    const courseId = match.params.cId;
    const specId = match.params.sId;
    const classes = useStyles();

    if (loading) {
        getGroups(specId);
        getStudents(courseId, groupId);
    }
    if (!isAuthenticated) {
        return <Redirect to="/login"/>;
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function onChange(event) {
        setGroupId(event.target.value);
        getStudents(courseId, event.target.value);
    }

    const rows = _.map(students, item => {
        return {
            username: item.username,
            firstName: item.firstName,
            lastName: item.lastName,
            groupName: item.group.name,
            options: (
                <TeacherStudentOptions
                    studentId={item.username}
                    courseId={courseId}
                    studentName={item.firstName + " " + item.lastName}
                />
            )
        };
    });
    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open
            })}
        >
            <select
                id="groups"
                name="groups"
                onChange={e => onChange(e)}
                value={groupId}
            >
                {groups &&
                groups.map(group => {
                    return (
                        <option key={group.groupId} value={group.groupId}>
                            {group.name}
                        </option>
                    );
                })}
            </select>
            <DataTable
                title="Students"
                columns={columns}
                data={rows}
                sortIcon={sortIcon}
                onRowClicked={handleClick}
            />
        </main>
    );
};
StudentsTable.propTypes = {
    getStudents: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    students: PropTypes.array,
    groups: PropTypes.array,
    groupId: PropTypes.string,
    username: PropTypes.string,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    students: state.student.data,
    groups: state.student.groups,
    loading: state.student.loading,
    open: state.communication.isOpen,
});

export default connect(mapStateToProps, {
    getStudents,
    getGroups
})(StudentsTable);