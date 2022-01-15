import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core';
import { DialogContent } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BookDetail = () => {
    let location = useLocation();
    const { data } = location.state;
    const { book } = location.state;
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    //get logged in user data from local storage
    const user = JSON.parse(localStorage.getItem('user'))

    //dialog close
    const handleClose = () => {
        setOpen(false);
    }

    //dialog sign-in button click
    const handleClick = () => {
        setOpen(false);
        window.location = '/sign-in'
    };


    //on buy now button click
    const handleBuyClick = () => {
        if (user) {
            const email = user.data.email
            const productId = data.id
            const cartData = {
                email: email,
                productId: productId
            }
            axios.post('http://localhost:5000/add-to-cart', cartData)
                .then(res => {
                    console.log(res);
                    navigate(`/cart`, { state: { email: email, books: book } });
                })
                .catch(err => {
                    console.error(err)
                })
        }
        else {
            setOpen(true)
        }

    }
    return (
        <div>
            <Box>
                <Card variant="outlined" style={{ paddingTop: '2%', paddingLeft: '10%', paddingBottom: '2%', paddingRight: '10%' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <CardMedia>
                                <img style={{ width: '60%' }} src={data.cover} alt={data.title} />
                            </CardMedia>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h5' align='left'>{data.title}</Typography>
                            <Typography color='textSecondary'>Authors : {data.authors.map((author) => {
                                return (
                                    <>
                                        {author},
                                    </>
                                )
                            })}</Typography>
                            <Typography color='textSecondary'>Category : {data.category}</Typography>
                            <Typography style={{ color: 'green', marginTop: '4%' }} >Available</Typography>
                            <Typography variant='h6' style={{ color: '#bc3232', marginTop: '2%' }}>₹{data.price}</Typography>
                            <Button variant="contained" style={{ backgroundColor: '#bc3232', color: '#fff', marginTop: '2%', marginRight: '2%' }} onClick={handleBuyClick} >
                                Buy Now
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
                <Typography variant='h6' style={{ backgroundColor: '#f0efef', color: '#404040', paddingLeft: '10%', paddingRight: '10%' }}>About The Book</Typography>
                <Typography style={{ paddingLeft: '10%', paddingTop: '2%', paddingRight: '10%' }}>{data.description}</Typography>
            </Box>

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
                    <Button color='primary' autoFocus onClick={handleClick}>
                        Sign in
                    </Button>
                </DialogActions>
            </Dialog>

        </div >
    )
}

export default BookDetail
