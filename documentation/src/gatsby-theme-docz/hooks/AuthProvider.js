import React, { createContext, useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import whitelistApi from '../api/whitelistApi';
import { getLocalStorage, setLocalStorage } from './Storage';
import usersApi from '../api/usersApi';

const AuthContext = createContext({})
const CLIENT_ID = process.env.GATSBY_GOOGLE_ID

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const googleId = getLocalStorage('googleId') || undefined;

    useEffect(() => {
        if (googleId) {
            handleGoogleId();
        }
    }, []);

    const handleGoogleId = async () => {
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
                if (e.response.status !== 404) {
                    console.log(e.response.data);
                }
            });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                {children}
            </GoogleOAuthProvider>
        </AuthContext.Provider>
    )
}

export default AuthContext