import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function NotificationBar(props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.parent.message) {
            setOpen(true);
        }
    }, [props.parent]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
                <MuiAlert
                    severity={props.parent.severity || "error"}
                    sx={{ width: "100%" }}
                    elevation={6}
                    variant="filled"
                >
                    {props.parent.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
}
