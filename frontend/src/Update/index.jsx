import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, MenuItem, TextField, Alert, Button } from '@mui/material';


export default function UpdateTransaction() {

    const { id } = useParams();

    const [transaction, setTransaction] = React.useState({});
    React.useState(() => {

        if (!id) {
            return;
        }

        fetch('/api/update', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.status === 404) {
                }
                else if (response.status === 500) {

                }
                return response.json();
            }
            )
            .then((data) => {
                console.log(data);
                setTransaction(data)
                return;
            })
    }, [id])

    const { register, handleSubmit, reset } = useForm();

    const [Snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'error',
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...Snackbar, open: false })
    }

    const type = [
        {
            value: 'REVENU',
            label: 'revenu',
        },
        {
            value: 'DEPENSE',
            label: 'dépense',
        },]

    const onSubmit = async (data) => {
        console.log(data);
        if (data.description === '' || data.amount === '' || data.type === '') {

        }
        await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Body: JSON.stringify(data),
            },
        }).then((response) => {
            if (response.status === 404) {
                setSnackbar({
                    open: true,
                    message: 'Cannot created',
                    severity: 'warning',
                })
            }
            if (response.status === 500) {
                setSnackbar({
                    open: true,
                    message: 'Server error',
                    severity: 'error',
                })
            }
            setSnackbar({
                open: true,
                message: 'Transactions créer avec succès',
                severity: 'success',
            })
            reset();
        }).catch((e) => {
            console.log('Error: ', e)
        })
    }

    return (
        <>
            {transaction.id &&
                <><Box component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        border: "solid 1px",
                        marginX: 40,
                        marginY: 20
                    }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 2 }}>
                        <TextField
                            required
                            {...register('description')}
                            label="description"
                            defaultValue={transaction.description} />

                        <div style={{ margin: 5 }}>
                            <TextField
                                {...register('type')}
                                select
                                label="Type"
                                defaultValue={transaction.type}
                                helperText="selectionnez un type svp"
                            >
                                {type.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 2 }}>
                        <TextField
                            required
                            {...register('amount')}
                            label="amount"
                            defaultValue={transaction.amount} />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ margin: 2 }}
                    >Modifier</Button>
                </Box><Snackbar
                    open={Snackbar.open}
                    autoHideDuration={3000} // Durée avant de disparaître
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                        <Alert onClose={handleClose} severity={Snackbar.severity}>
                            {Snackbar.message}
                        </Alert>
                    </Snackbar></>
            }
        </>
    )
}