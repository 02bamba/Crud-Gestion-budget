import * as React from 'react';
import { useForm } from 'react-hook-form';
import {Button, Alert, MenuItem, TextField, Box} from '@mui/material';

export default function CreateTransaction(){

    const{register, handleSubmit, reset} = useForm();

    const [Snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'error',
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...Snackbar, open: false})
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
            console.log('Error: ',e)
        })
    }

    return(
        <>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}
            sx={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: "solid 1px",
            marginX:40,
            marginY:20
            }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 2}}>
        <TextField
          required
          {...register('description')}
          label="description"
          placeholder='saisir une description'
        />
        
        <div style={{margin: 5}}>
        <TextField
          {...register('type')}
          select
          label="Type"
          defaultValue="REVENU"
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
        <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 2}}>
        <TextField
          required
          {...register('amount')}
          label="amount"
          placeholder="saisisez un montant"
        />
        </Box>
        <Button 
            variant="contained"
            color="primary"
            type="submit"
            sx={{margin: 2}}
        >Ajouter</Button>
        </Box>
        <Snackbar
        open={Snackbar.open}
        autoHideDuration={3000} // Durée avant de disparaître
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={Snackbar.severity}>
          {Snackbar.message}
        </Alert>
      </Snackbar>
        </>
    )
}