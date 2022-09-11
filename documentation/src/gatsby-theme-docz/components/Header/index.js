/** @jsx jsx */
import { jsx, Box, Flex, useColorMode } from 'theme-ui'
import { useConfig, useCurrentDoc } from 'docz'
import React, { useEffect, useState } from 'react';

import { default as Edit } from 'react-feather/dist/icons/edit-2'
import { default as Menu } from 'react-feather/dist/icons/menu'
import { default as Sun } from 'react-feather/dist/icons/sun'
import { default as Github } from 'react-feather/dist/icons/github'
import { FiLogOut, FiUser } from 'react-icons/fi';
import { GrConfigure } from 'react-icons/gr';

import { Logo } from '../Logo'
import Modals from '../Modal/Modals';
import UserList from '../../views/dashboard/UserList';
import LogoutGoogle from '../Login/LogoutGoogle';
import useAuth from '../../hooks/useAuth';
import * as styles from './styles'
import ModifyUser from '../../views/dashboard/ModifyUser';
import NotificationBar from '../Utils/NotificationBar';
import { getLocalStorage } from '../../hooks/Storage';

const ROLES_ADMIN = ['ADMIN'];

export const Header = props => {
    const { onOpen } = props;
    const {
        repository,
        themeConfig: { showDarkModeSwitch, showMarkdownEditButton },
    } = useConfig();

    const { auth } = useAuth();
    const { edit = true, ...doc } = useCurrentDoc();
    const [colorMode, setColorMode] = useColorMode();
    const localRol = getLocalStorage('roles') || '';
    const [isAdmin, setIsAdmin] = useState([localRol]?.find(role => ROLES_ADMIN.includes(role)) ? true : false);
    const [registerUser, setRegisterUser] = useState({ email: '', roles: '', display: 'none' });
    const [notification, setNotification] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (auth !== {} && auth.roles !== undefined) {
            setIsAdmin([auth?.roles]?.find(role => ROLES_ADMIN.includes(role)) ? true : false);
        }
    }, [auth]);

    const toggleColorMode = () => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light')
    }

    return (
        <>
            <NotificationBar parent={notification} />
        <div sx={styles.wrapper} data-testid="header">
            <Box sx={styles.menuIcon}>
                <button sx={styles.menuButton} onClick={onOpen}>
                    <Menu size={25} />
                </button>
            </Box>
            <div sx={styles.innerContainer}>
                <Logo />
                <Flex>
                        {isAdmin && (
                            <Box sx={{ mr: 2 }}>
                                <button
                                    sx={styles.headerButton}
                                    onClick={(e) => { setOpenModal(true); }}
                                    aria-label='Administrar'
                                >
                                    <GrConfigure size={15} />
                                </button>
                                <Modals
                                    open={openModal}
                                    onClose={(e) => setOpenModal(false)}
                                    title="Usuarios"
                                    description="Administración de usuarios"
                                    icon={<FiUser />}
                                >
                                    <div className="screen-content" style={{ display: registerUser.display }}>
                                        <ModifyUser registerUser={registerUser} setRegisterUser={setRegisterUser} notification={setNotification} />
                                    </div>
                                    <br />
                                    <div className="screen-content">
                                        <UserList onClose={(e) => setOpenModal(false)} registerUser={registerUser} setRegisterUser={setRegisterUser} notification={setNotification} />
                                    </div>
                                </Modals>
                            </Box>
                        )}
                    <Box sx={{ mr: 2 }}>
                        <LogoutGoogle classButton='logout-button-header' styleBtn={styles.headerButton}>
                            <FiLogOut size={15} />
                        </LogoutGoogle>
                    </Box>
                    {repository && (
                        <Box sx={{ mr: 2 }}>
                            <a
                                href={repository}
                                sx={styles.headerButton}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github size={15} />
                            </a>
                        </Box>
                    )}
                    {showDarkModeSwitch && (
                        <button
                            sx={styles.headerButton}
                            onClick={toggleColorMode}
                            aria-label={`Switch to ${colorMode} mode`}
                        >
                            <Sun size={15} />
                        </button>
                    )}
                </Flex>
                {showMarkdownEditButton && edit && doc.link && (
                    <a
                        sx={styles.editButton}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Edit width={14} />
                        <Box sx={{ pl: 2 }}>Edit page</Box>
                    </a>
                )}
            </div>
        </div>
        </>
    )
}
