import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import usersApi from '../../api/usersApi';


export const ModifyUser = (props) => {
    const [emailSelected, setEmailSelected] = useState('');
    const [radioSelected, setRadioSelected] = useState('');

    useEffect(() => {
        setEmailSelected(props.registerUser.email);
        setRadioSelected(props.registerUser.roles);
    }, [props.registerUser]);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const handlePostUser = async () => {
        if (radioSelected === '' && emailSelected === '') {
            props.notification({ severity: 'warning', message: `Los campos email y roles no deben estar vacios.` });
        } else if (!validateEmail(emailSelected)) {
            props.notification({ severity: 'warning', message: `El email introducido no tiene un formato valido.` });
        } else {
            const messageSuccess = props.registerUser.email !== '' ? 'Modificado' : 'Creado'
            let lastEmail = props.registerUser.email !== '' ? props.registerUser.email : emailSelected
            await usersApi
                .postUser(lastEmail, emailSelected, radioSelected)
                .then((response) => {
                    props.notification({ severity: 'success', message: `Usuario ${messageSuccess} correctamente!` });
                })
                .catch((error) => {
                    console.log(error);
                    props.notification({ severity: 'error', message: `Hubo un error con el usuario ${messageSuccess}.` });
                })
            props.setRegisterUser(registerUser => ({ ...registerUser, display: 'none', email: '', roles: 'GUEST' }));
        };
    };

    return (
        <>
            <h3>{props.registerUser.email !== '' ? 'Modificar' : 'Registrar'} un usuario</h3>
            <div className="info-users">
                <TextField label="Email" value={emailSelected} helperText={props.registerUser.email !== '' ? 'Anterior email: ' + props.registerUser.email : ''} onChange={(e) => { setEmailSelected(e.target.value); }} variant="outlined" sx={{ marginRight: "30px" }} />
                <FormControl>
                    <FormLabel>Roles:</FormLabel>
                    <RadioGroup value={radioSelected} defaultValue='GUEST' onChange={(e) => setRadioSelected(e.target.value)}>
                        <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                        <FormControlLabel value="GUEST" control={<Radio />} label="Guest" />
                        <FormControlLabel
                            value="ENTERPRISE"
                            control={<Radio />}
                            label="Enterprise"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button onClick={(e) => { handlePostUser(); }}>
                    Registrar
                </Button>
                <Button onClick={(e) => { props.setRegisterUser(registerUser => ({ ...registerUser, display: 'none', email: '', roles: 'GUEST' })); }}>
                    Cancelar
                </Button>
            </div>
        </>
    );
};

export default ModifyUser;
