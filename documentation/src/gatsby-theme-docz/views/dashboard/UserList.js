import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import EnhancedTable from '../../components/Table/EnhancedTable';
import { FiPlus } from "react-icons/fi";
import './UserList.css';


export const UserList = (props) => {

    return (
        <>
            <h3>Lista de usuarios</h3>
            <Button onClick={(e) => { props.setRegisterUser(registerUser => ({ ...registerUser, display: '', email: '', roles: 'GUEST' })); }} variant="outlined" aria-label="add" sx={{ padding: '7px 8px', minWidth: '0px', fontSize: '2rem' }}>
                <FiPlus />
            </Button>
            <div className="table-users">
                <EnhancedTable registerUser={props.registerUser} setRegisterUser={props.setRegisterUser} notification={props.notification} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '10px' }}>
                <Button variant="contained" onClick={(e) => { props.setRegisterUser(registerUser => ({ ...registerUser, display: 'none', email: '', roles: 'GUEST' })); props.onClose(e); }}>
                    Cerrar
                </Button>
            </div>
        </>
    );
};

export default UserList;
