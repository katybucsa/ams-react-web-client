import React from 'react';
import Loader from 'react-loader-spinner';

export default () => (
    <div style={{
        padding: '5rem',
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Loader type="ThreeDots" color="#3f51b5" height="100" width="100"/>
    </div>
)