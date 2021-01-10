import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile: { profile } }) =>
    profile !== null ? (
        <div className="profile-about bg-light p-2">
            <h1 className="large">Profile details</h1>
            <p>
                <strong>First name: </strong> {profile.firstName}
            </p>
            <p>
                <strong>Last name: </strong> {profile.lastName}
            </p>

            <p>
                <strong>Email: </strong> {profile.email}
            </p>
        </div>
    ) : (
        <div className="profile-about bg-light p-2">
            Your profile is not updated
        </div>
    );

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;