import { Dialog, DialogActions, DialogContentText, DialogTitle, Button, Divider, Grid, Typography, DialogContent, Paper } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BookList = (props) => {
    const navigate = useNavigate();
    let location = useLocation();
    const { data } = location.state;
    const { category } = location.state;
    const [open, setOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('user'))

    //on book title click it will navigate to another page with book id
    const handleClick = (book) => {
        const id = book.id
        navigate(`/book-list/${id}`, { state: { data: book, book: data } });
    }

    //dialog close
    const handleClose = () => {
        setOpen(false);
    }

    //dialog signin click
    const handleSignInClick = () => {
        setOpen(false);
        window.location = '/sign-in'
    };

    //on buy now click button
    const handleClickCart = (book) => {
        if (user) {
            const email = user.data.email
            const productId = book.id
            const cartData = {
                email: email,
                productId: productId
            }

            //add-to-cart api
            axios.post('http://localhost:5000/add-to-cart', cartData)
                .then(res => {
                    console.log(res);
                    navigate(`/cart`, { state: { email: email, books: data } });
                })
                .catch(err => {
                    console.error(err)
                })
        }
        else {
            setOpen(true);
        }

    }
    return (
        <div>
            <Paper>
                <Typography variant='h4' align='center' style={{ paddingTop: '1%', paddingBottom: '1%' }} >{category} Books</Typography>
                <Divider />

                {/* fetched api data mapping */}
                {data.map((book) => {
                    return (
                        <div>
                            {(() => {
                                if (book.category === category) {
                                    return (
                                        <>
                                            <Grid container xs={12} style={{ paddingLeft: '5%', marginTop: '2%' }}>
                                                <Grid item xs={2} style={{ marginTop: '1%' }} >
                                                    <img style={{ marginLeft: '2%', height: '90%', width: '80%' }} src={book.cover} alt='database book' />
                                                </Grid>
                                                <Grid item xs={10} style={{ marginTop: '1%' }}>
                                                    <Grid container xs={12}>
                                                        <Grid item xs={6}>
                                                            <Typography variant='h6' color='textSecondary' style={{ cursor: 'pointer' }} onClick={() => handleClick(book)} >{book.title}</Typography>
                                                            <Typography >Authors : {book.authors}</Typography>
                                                            <Typography variant='h6' color='secondary' >₹{book.price}</Typography>
                                                            <Button variant="contained" onClick={() => handleClickCart(book)} style={{ backgroundColor: '#bc3232', color: '#fff', marginTop: '1%' }}>
                                                                Buy Now
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography style={{ color: 'green' }} >Available</Typography>
                                                            <Typography>Ships within 4-5 days</Typography>
                                                            <Typography>₹50 shipping in India per item and low cost</Typography>
                                                            <Typography color='primary' >Worlwide</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                }
                            })()}
                        </div>
                    )
                })}
                {/* dialog */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Not Signed -in Yet?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Sign in First
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' autoFocus onClick={handleSignInClick}>
                            Sign in
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </div>
    )
}

export default BookList
