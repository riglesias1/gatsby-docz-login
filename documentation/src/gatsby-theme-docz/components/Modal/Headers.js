import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { FiDatabase } from "react-icons/fi";
import useAuth from '../../hooks/useAuth';
import './Headers.css';

export const Header = ({
  title,
  description = '',
  icon = <FiDatabase />,
  style = undefined,
}) => {
  const { auth } = useAuth();

  const [userLog, setUserLog] = useState({});

  useEffect(() => {
    setUserLog({
      name: auth?.name,
      image: auth?.imageUrl,
    });
  }, [auth]);

  return (
    <div className="screen-header" style={style}>
      <div className="screen-header-icon-container">{icon}</div>
      <div className="screen-header-descriptions">
        <p className="screen-header-title">{title}</p>
        <p>{description}</p>
      </div>
      <div className="user-logued-header">
        <p className="name-logued-header">Hola {userLog.name}!</p>
        <Avatar alt="profile-img" src={userLog.image} />
      </div>
    </div>
  );
};

export default Header;
