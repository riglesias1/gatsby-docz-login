import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import whitelistApi from '../../api/whitelistApi';
import RenderIf from '../../hooks/RenderIf';
import LoginView from '../../views/login/LoginView';
import UnauthorizedView from '../../views/unauthorized/UnauthorizedView';
import BackDropLoading from '../../components/Utils/BackdropLoading';
import Waves from '../../components/Waves/Waves';
import { getLocalStorage, setLocalStorage } from '../../hooks/Storage';

const EMAIL_COMPANY = process.env.GATSBY_EMAIL_COMPANY?.replace(' ', '').split(',');

const HomeView = (props) => {
    const navigate = useNavigate();

    const googleId = getLocalStorage('googleId') || '';
    const email = getLocalStorage('email') || '';
    const allChecked = getLocalStorage('allChecked', true) || false;
    const userLogged = [email, email?.split('@')[1]]

    const [showBackdrop, setShowBackDrop] = useState(false);
    const [authorized, setAuthorized] = useState(userLogged?.find(role => EMAIL_COMPANY.includes(role)) ? true : undefined)
    const [loggedIn, setLoggedIn] = useState(undefined)
    const [isAllChecked, setIsAllChecked] = useState(allChecked)

    useEffect(() => {
        if ((authorized === undefined) && googleId !== '') {
            setShowBackDrop(true);
        } else if (authorized !== undefined) {
            setShowBackDrop(false);
        }
        if (authorized === false) {
            setIsAllChecked(false);
            setLocalStorage('allChecked', false);
        } else if (authorized === true) {
            setIsAllChecked(true);
            setLocalStorage('allChecked', true);
        }
    }, [authorized]);

    useEffect(() => {
        if (googleId) { setLoggedIn(true); handleAuthorized(); }
        else if (!googleId) { setLoggedIn(false); }

    }, [googleId]);

    const handleAuthorized = async () => {
        await whitelistApi
            .getGoogleData(googleId)
            .then((response) => {
                const userLogged = [response?.email, response?.email?.split('@')[1]]

                setLocalStorage('email', response?.email);

                if (userLogged?.find(role => EMAIL_COMPANY.includes(role))) {
                    setAuthorized(true);
                    navigate("/")
                } else if (response.error_description === 'Invalid Credentials') {
                    setAuthorized(false);
                    navigate("/login");
                } else {
                    handleExternalUser(response?.email);
                }
            })
            .catch((e) => {
                console.log(e);
                setAuthorized(false);
                navigate("/unauthorized");
            });
    };

    const handleExternalUser = async (googleEmail) => {
        let userInWhitelist

        await whitelistApi
            .getWhitelist()
            .then((response) => {
                for (let user in response) {
                    if (response[user]['email'] === googleEmail) {
                        userInWhitelist = true;
                        setLocalStorage('roles', response[user]['roles']);
                        break;
                    }
                    userInWhitelist = false;
                }
                setAuthorized(userInWhitelist);
                if (userInWhitelist) { navigate("/"); } else { navigate("/unauthorized"); }
            })
            .catch((e) => {
                console.log(e);
                setAuthorized(false);
                navigate("/unauthorized")
            });
    };

    return (
        <>
            {isAllChecked === true ? props.children : (
                <div>
                    <RenderIf isTrue={showBackdrop}>
                        <BackDropLoading />
                    </RenderIf>

                    <RenderIf isTrue={loggedIn === false}>
                        <LoginView />
                    </RenderIf>

                    <RenderIf isTrue={loggedIn && (authorized === undefined)}>
                        <Waves />
                    </RenderIf>

                    <RenderIf isTrue={loggedIn && (authorized === false)}>
                        <UnauthorizedView />
                    </RenderIf>

                    <RenderIf isTrue={loggedIn && authorized}>
                        {props.children}
                    </RenderIf>
                </div>
            )}
        </>
    );
};

export default HomeView;