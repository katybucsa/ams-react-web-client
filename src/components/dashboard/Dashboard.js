import React, {useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setOpen} from "../../store/communication/communicationActions";
import {Redirect} from "react-router-dom";
import {useStyles} from "../../styles/styles";
import MyProfile from "../profile/MyProfile";
import {getCurrentProfile} from "../../store/profile/profileActions";


const Dashboard = ({auth: {isAuthenticated, role, loading}, open, profile, profileLoading, getCurrentProfile}) => {
    const classes = useStyles();

    if (profileLoading) {
        getCurrentProfile();
    }

    if (!isAuthenticated) {
        return <Redirect to="/login"/>;
    }

    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open
            })}
        >
            <div className={classes.drawerHeader}/>
            <MyProfile profile={profile}/>
        </main>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    open: PropTypes.bool,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    profileLoading: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth,
    open: state.communication.isOpen,
    profile: state.profile,
    profileLoading: state.profile.loading
});

export default connect(mapStateToProps, {
    setOpen: setOpen,
    getCurrentProfile
})(Dashboard);