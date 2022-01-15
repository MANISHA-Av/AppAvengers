import { Box, Button, Link, Paper, Typography } from '@material-ui/core';
import React from 'react'
import profileImg from '../image/profile-picture.jpg'
//get the data of logged-in user
const user = JSON.parse(localStorage.getItem('user'))

const MyProfile = () => {
    return (
        <div>
            <Paper style={{ width: '60%', marginLeft: '20%', marginTop: '5%' }}>
                <center>
                    <img className='rounded-circle centered' style={{ marginTop: '5%', height: '100px' }} src={profileImg} alt="Profile" />
                    <Typography variant='h5'>{user.data.fullname}</Typography>
                    <Typography variant='h6' style={{ color: 'green' }}>{user.data.email}</Typography>
                </center>
                <Box textAlign='center' marginTop='1%' paddingBottom='1%'>
                    {/* route to my-order page */}
                    <Link href='/myorder'>
                        <Button variant='contained' color='primary' size='small'>
                            My Order
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </div>
    )
}

export default MyProfile