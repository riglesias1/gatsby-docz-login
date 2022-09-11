import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';


export const LogoutGoogle = (props) => {
    const isBrowser = () => typeof window !== "undefined";
    const navigate = useNavigate();

    const onSuccess = () => {
        googleLogout();
        isBrowser() && localStorage.clear();
        console.log('Logout Success!!');
        navigate("/login");
    }

    return (
        <div className='signOutButton'>
            <button style={props.styleBtn} onClick={onSuccess} className={props.classButton}>{props.children}</button>
        </div>
    );
};

export default LogoutGoogle;