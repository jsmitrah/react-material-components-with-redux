import React, { useState, Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import _map from 'lodash/map';
import Button from '@material-ui/core/Button';

const Notification = props => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');
    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleClick = (name, msg) => {
        setOpen(true);
        setName(name);
        setMsg(msg);
    };
    return (
        <>
            {_map(props.commonData, (button, key) => {
                return (
                    <Fragment key={key}>
                        <Button
                            variant="outlined"
                            onClick={() => handleClick(button.type, button.msg)}
                            style={{ color: 'white', backgroundColor: button.bg, marginRight: '10px' }}
                        >
                            {button.type}
                        </Button>
                    </Fragment>
                );
            })}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={name} onClose={handleClose}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Notification;
