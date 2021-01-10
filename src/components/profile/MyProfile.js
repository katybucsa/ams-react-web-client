import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {getCurrentProfile} from "../../store/profile/profileActions";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileTop from "./ProfileTop";
import "./Profile.css";

const MyProfile = profile => {
    useEffect(username => {
        getCurrentProfile(username);
    }, []);
    return profile.loading ? (
        <Spinner/>
    ) : (
        <Fragment>
            <div className="profile-grid my-1">
                <ProfileTop profile={profile.profile}/>
                <ProfileAbout profile={profile.profile}/>
            </div>
        </Fragment>
    );
};

MyProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    user: state.auth.user
});

export default connect(mapStateToProps, {getCurrentProfile})(MyProfile);