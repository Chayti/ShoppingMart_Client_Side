import { Button, TextField, Alert } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                }
            })

        e.preventDefault()
    }
    return (
        <>
            <div>
                <h2 style={{ color: "#89a077" }} >Make an Admin</h2>
                <form onSubmit={handleAdminSubmit}>
                    <TextField
                        sx={{ width: '50%' }}
                        label="Email"
                        type="email"
                        onBlur={handleOnBlur}
                        variant="standard" />
                    <br /><br />
                    <Button style={{ color: "#89a077" }} type="submit" size="large" variant="outlined">Make Admin</Button>
                </form>
                {success && <Alert severity="success">Made Admin successfully!</Alert>}
            </div>
            <div className="admin-banner">
            </div>
        </>
    );
};

export default MakeAdmin;