import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography } from '@material-ui/core';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

let totalPrice = 0;
const Cart = () => {
    let location = useLocation();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const { books } = location.state;
    const { email } = location.state;

    useEffect(() => {
        const cartData = {
            email: email,
        }
        axios.post('http://localhost:5000/fetch-cart', cartData)
            .then(res => {
                console.log(res.data.data.length)
                localStorage.setItem('itemCount',res.data.data.length )
                setData(res.data.data);
            })
            .catch(err => {
                console.error(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //search book functionality to check id betwwen the booklist  and the cart data book id
    function searchBook(productId) {
        let book = null
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === productId) {
                book = books[i];
                break;
            }
        }
        return book;
    }

    //place-order button
    const placeOrderButton = () => {
        let items = [];

        if (data) {
            // eslint-disable-next-line array-callback-return
            data.map((item) => {
                const book = searchBook(item.productId);
                const price = item.count * book.price;
                items.push({
                    productId: item.productId,
                    count: item.count,
                    price: price
                })
            })
            var date = new Date().toISOString().slice(0, 10);
            const postData = {
                email: email,
                items: items,
                date: date

            }
            axios.post('http://localhost:5000/place-order', postData)
                .then(res => {
                    console.log(res)
                    setOpen(true)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);
        window.location = '/'
    };
    const shopMoreButton = () => {
        window.location = '/'
    }
    return (

        <div>
            <TableContainer component={Paper} style={{ paddingLeft: '15%', paddingTop: '1%', paddingRight: '15%', width: '70%' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} align='left'>Items description</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} align="left">Quantity</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} align="left">Price</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} align="left">Total Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            {(() => {
                //check the fetched data is set into useState or not
                if (data && books) {
                    totalPrice = 0;
                    return (
                        data.map((cartItem) => {
                            const productId = cartItem.productId;
                            const book = searchBook(productId);
                            const bookPrice = cartItem.count * book.price;
                            totalPrice = totalPrice + bookPrice;

                            //setTotalPrice(bookPrice + totalPrice);
                            return (
                                <>
                                    <TableContainer component={Paper} style={{ paddingLeft: '15%', paddingTop: '1%', paddingRight: '15%', width: '70%' }}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableBody>
                                                <StyledTableRow key={book.id}>
                                                    <StyledTableCell align="left" style={{ width: '10%' }} >{book.title}</StyledTableCell>
                                                    <StyledTableCell style={{ width: '10%' }} ><img src={book.cover} style={{ width: '60%' }} alt={book.title} /></StyledTableCell>
                                                    <StyledTableCell style={{ width: '10%' }} >{cartItem.count}</StyledTableCell>
                                                    <StyledTableCell style={{ width: '10%' }} >{book.price}</StyledTableCell>
                                                    <StyledTableCell style={{ width: '10%' }} >{bookPrice}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )

                        })

                    )
                }
                else {
                    return (
                        <div>
                            Cart Items
                        </div>
                    )
                }
            })()}
            <div style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '1%' }}>
                <Typography variant='h5' style={{ color: 'green', }} align='right' >Amount Payable : ₹{totalPrice}</Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{ backgroundColor: '#494949', color: "#fff" }} onClick={shopMoreButton} >
                            {'>>'}Shop more items
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{ backgroundColor: '#bc3232', color: '#fff', marginTop: '1%', float: 'right', }} onClick={placeOrderButton} >
                            Place Order {'->'}
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {/* dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        Your Order has been Placed
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' autoFocus onClick={handleSubmit}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Cart

