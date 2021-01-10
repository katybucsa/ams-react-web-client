import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {connect, useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import {useStyles} from "../../styles/styles";
import {callService, changeServiceState, stopOneService} from "../../store/admin/adminActions";
import List from "@material-ui/core/List";
import AdminItem from "./AdminItem";
import Grid from "@material-ui/core/Grid";


const AdminPanel = ({auth: {isAuthenticated, role, loading}, admin, callService}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [notCalled, setNotCalled] = useState(true);

    useEffect(() => {

        if (isAuthenticated && notCalled) {
            if (admin.authLoading) {
                callService("auth");
            }
            if (admin.assignLoading) {
                callService("assignment");
            }
            if (admin.courseLoading) {
                callService("course");
            }
            if (admin.gatLoading) {
                callService("gateway");
            }
            if (admin.notifLoading) {
                callService("notification");
            }
            if (admin.studLoading) {
                callService("student");
            }
            setNotCalled(false);
        }
    });
    if (!isAuthenticated) {
        return <Redirect to="/login"/>;
    }

    navigator.serviceWorker.addEventListener('message', event => dispatch(changeServiceState(event.data.service, event.data.state)));

    const stopService = async (service) => {
        dispatch(stopOneService(service));
    };

    return (
        <div className={classes.root}>
            <main>
                <div className={classes.drawerHeader}/>
                <Typography variant={"h5"} style={{marginLeft: '3rem'}}>
                    Admin Panel
                </Typography>
                <Typography align={"center"} style={{marginLeft: '18rem', marginBottom: '5rem'}} variant={"h6"}>
                    Here you can fail the running microservices
                </Typography>
                <Grid container justify="center" style={{marginLeft: '20rem',display: 'block'}}>
                    <List>
                        <AdminItem key={"auth"} name={"Auth Service"} path={"auth"} running={admin.authRunning}
                                   stopService={stopService}/>
                        <AdminItem key={"assignment"} name={"Assignment Service"} path={"assignment"}
                                   running={admin.assignRunning} stopService={stopService}/>
                        <AdminItem key={"course"} name={"Course Service"} path={"course"} running={admin.courseRunning}
                                   stopService={stopService}/>
                        <AdminItem key={"gateway"} name={"Gateway Service"} path={"gateway"} running={admin.gatRunning}
                                   stopService={stopService}/>
                        <AdminItem key={"notification"} name={"Notification Service"} path={"notification"}
                                   running={admin.notifRunning} stopService={stopService}/>
                        <AdminItem key={"student"} name={"Student Service"} path={"student"} running={admin.studRunning}
                                   stopService={stopService}/>
                    </List>
                </Grid>
            </main>
        </div>
    );
};

AdminPanel.propTypes = {
    auth: PropTypes.object.isRequired,
    open: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
});

export default connect(mapStateToProps, {callService})(AdminPanel);