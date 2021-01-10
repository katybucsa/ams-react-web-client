import React, {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import "./Sidebar.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getStudentCourses} from "../../../store/courses/studentCourseActions";
import useTheme from "@material-ui/core/styles/useTheme";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Spinner from "../Spinner";
import {getProfessorCourses} from "../../../store/courses/professorCourseActions";
import {setOpen} from "../../../store/communication/communicationActions";
import {useStyles} from "../../../styles/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SchoolIcon from "@material-ui/icons/School";
import ListItemText from "@material-ui/core/ListItemText";
import {getPosts} from "../../../store/posts/postActions";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {getGradesByStudent} from "../../../store/grade/gradeActions";
import {getGroups, getStudents} from "../../../store/student/studentActions";

function SidebarItem({courseItem, handleClickPosts, handleClickStudents, handleClickGrades, role}) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <SchoolIcon/>
                </ListItemIcon>
                <ListItemText primary={courseItem.name}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout={"auto"} unmountOnExit>
                <List component="div" disablePadding>
                    <div className={clsx(classes.nested, "nested")}>
                        <Link to={`/course/${courseItem.id}/posts`} key={1}>
                            <ListItem button
                                      onClick={() => handleClickPosts(courseItem.id)}>
                                <ListItemText primary="Posts"/>
                            </ListItem>
                        </Link>
                    </div>
                    {role !== 'STUDENT' && (
                        <div className={clsx(classes.nested, "nested")}>
                            <Link to={`/students/${courseItem.id}/${courseItem.specId}`} key={2}>
                                <ListItem button
                                          onClick={() => handleClickStudents(courseItem)}>
                                    <ListItemText primary="Students"/>
                                </ListItem>
                            </Link>
                        </div>
                    )}
                    <div className={clsx(classes.nested, "nested")}>
                        <Link to={`/grades/${courseItem.id}`} key={3}>
                            <ListItem button
                                      onClick={() => handleClickGrades(courseItem.id)}>
                                <ListItemText primary="Grades"/>
                            </ListItem>
                        </Link>
                    </div>
                </List>
            </Collapse>
        </>
    )
}

const Sidebar = ({
                     auth: {isAuthenticated, role, loading},
                     getStudentCourses,
                     getProfessorCourses,
                     studentCourses,
                     professorCourses,
                     getPosts,
                     csLoading,
                     cpLoading,
                     open,
                     setOpen,
                     getStudents,
                     getGradesByStudent,
                     groups
                 }) => {

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickPosts = (id) => {
        getPosts(id);
    };



    const handleClickStudents = async (course) => {
        await getGroups(course.specId);
        if (groups !== undefined)
            getStudents(course.id, groups[0].groupId);
        else
            getStudents(course.id, null);
    };

    const handleClickGrades = (id) => {
        getGradesByStudent(id);
    };

    const mainListItems = (courses, prof = false) =>
        <div>
            {!prof ? <ListSubheader inset>Enrolled Courses</ListSubheader> :
                <ListSubheader inset>Teaching Courses</ListSubheader>}
            {courses.map((courseItem, index) =>
                <SidebarItem button key={index} courseItem={courseItem} handleClickGrades={handleClickGrades}
                             handleClickPosts={handleClickPosts} handleClickStudents={handleClickStudents} role={role}/>
            )}
        </div>;

    const drawer = (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            {isAuthenticated && role === 'STUDENT' && (csLoading ? (<Spinner/>) : (
                <List component="nav">{mainListItems(studentCourses)}</List>))}
            {isAuthenticated && role === 'PROFESSOR' && (cpLoading ? (<Spinner/>) : (
                <List component="nav">{mainListItems(professorCourses)}</List>))}
        </Drawer>
    );

    if (isAuthenticated && csLoading && role === 'STUDENT') {
        getStudentCourses();
    }

    if (isAuthenticated && cpLoading && role === 'PROFESSOR') {
        getProfessorCourses();
    }

    return (
        <div className={classes.root}>
            {!loading && isAuthenticated && role !== 'ADMIN' && drawer}
        </div>
    );
};

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    studentCourses: PropTypes.any,
    professorCourses: PropTypes.any,
    csLoading: PropTypes.bool,
    cpLoading: PropTypes.bool,
    open: PropTypes.bool,
    groups: PropTypes.array
};


const mapStateToProps = state => ({
    auth: state.auth,
    studentCourses: state.studentCourses.data,
    professorCourses: state.professorCourses.data,
    csLoading: state.studentCourses.loading,
    cpLoading: state.professorCourses.loading,
    open: state.communication.isOpen,
    groups: state.student.groups
});

export default connect(mapStateToProps, {
    getStudentCourses,
    getProfessorCourses,
    setOpen,
    getPosts,
    getGradesByStudent,
    getStudents
})(Sidebar);