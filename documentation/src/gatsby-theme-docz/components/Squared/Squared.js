import React from 'react';
import './Squared.css';

export const Squared = ({ children }) => {

    return (
        <div className="squared-container">

            <div className="squared-main">
                <div className="squared-switch">
                    <div className="squared-circle"></div>
                    <div className="squared-circle squared-circle-top"></div>
                    <div className="squared-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Squared