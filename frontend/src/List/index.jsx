import * as React from 'react';
import { Paper, Link,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';


export default function ListTransaction() {

    const [transactions, setTransactions] = React.useState([]);
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
    const total = 0;

    React.useEffect(() => {
        fetch(`/api/transaction/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 404) {
                setSnackbar({
                    open: true,
                    message: 'No transactions found',
                    severity: 'warning',
                })
            } else if (response.status === 500) {
                setSnackbar({
                    open: true,
                    message: 'Server error',
                    severity: 'error',
                })
            }
            return response.json();
        }).then((data) => {
            setTransactions(data);
            setSnackbar({
                open: true,
                message: 'Transactions recupérés avec succès',
                severity: 'success',
            })
        }).catch((e) => {
            console.log('error:', e)
            setSnackbar({
                open: true,
                message: `Error: ${e}`,
                severity: 'warning',
            })
        })
    }, [])

    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                            <TableCell align="right">Solde Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow
                                key={transaction.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {transaction.description}
                                </TableCell>
                                <TableCell align="right">{transaction.type}</TableCell>
                                <TableCell align="right">{transaction.amount}</TableCell>
                                <TableCell align="right">{transaction.date}</TableCell>
                                <TableCell align="right"><Link href="">Afficher detail</Link></TableCell>
                                <TableCell align="center" >{total}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
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
