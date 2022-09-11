import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useGoogleLogin } from '@react-oauth/google';
import { setLocalStorage } from '../../hooks/Storage';
import usersApi from '../../api/usersApi';
import whitelistApi from '../../api/whitelistApi';


export const LoginGoogle = (props) => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const onFailure = (res) => {
        console.log('Login Failed!! res: ', res);
    }

    const googleLogins = useGoogleLogin({
        onSuccess: tokenResponse => handleLogin(tokenResponse),
        onError: error => onFailure(error)
    });

    const handleLogin = (res) => {
        const googleId = res['access_token'];

        setLocalStorage('googleId', googleId);
        handleGoogleId(googleId);
    };

    const handleGoogleId = async (googleId) => {
        let email = ''

        await whitelistApi
            .getGoogleData(googleId)
            .then((response) => {
                email = response['email'];
                const name = response['name'];
                const imageUrl = response['picture'];

                handleUser(email);

                setAuth({ googleId, email, name, imageUrl });
                setLocalStorage('email', email);
                console.log('Login Success!!');
                navigate("/");
            })
            .catch((e) => {
                setAuth(auth => ({ ...auth, email }))
                setLocalStorage('email', email);
                console.log(e);
            });
    };

    const handleUser = async (email) => {
        let roles = ''

        await usersApi
            .getUser(email)
            .then((response) => {
                roles = response['roles']
                setAuth(auth => ({ ...auth, roles }))
                setLocalStorage('roles', roles);
            })
            .catch((e) => {
                setAuth(auth => ({ ...auth, roles }))
                setLocalStorage('roles', roles);
                if (e.response.status === 404) {
                    console.log('Usuario sin rol.');
                } else {
                    console.log(e.response.data);
                }
            });
    };

    return (
        <div className='signInButton'>
            <button onClick={googleLogins} className={props.classButton}>{props.children}</button>
        </div>
    );
};

export default LoginGoogle;