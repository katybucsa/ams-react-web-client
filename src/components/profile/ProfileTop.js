import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({profile}) => {

    return localStorage.getItem("role") === "STUDENT" ? (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src="/profile.png" alt=""/>
        </div>
    ) : (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src="/profile.png" alt=""/>
        </div>
    );
};
ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;