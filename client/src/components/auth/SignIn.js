import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    Container,
    Avatar,
    Link
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import axios from 'axios';

const SignIn = () => {

    const [user, setUser] = useState({
        email: "", password: ""
    })
    let name, value;

    //input onchange button
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    //for form validation
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    //log in button
    const onSubmit = data => {
        console.log(data)
        axios.post('http://localhost:5000/sign-in', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location = '/'
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <Paper style={{ marginTop: "20%" }}>
                    <Box px={3} py={2}>
                        <Avatar style={{ marginLeft: "45%", marginBottom: '3%', backgroundColor: '#3f51b5' }}>
                            <MenuBookIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" align="center" margin="dense">
                            Sign In
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    onChange={handleChange}
                                    margin="dense"
                                    {...register('email')}
                                    error={errors.email ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.email?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    onChange={handleChange}
                                    margin="dense"
                                    {...register('password')}
                                    error={errors.password ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.password?.message}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box mt={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Login
                            </Button>
                        </Box>
                        <Grid style={{ marginTop: '5%' }} container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-up" variant="body2" >
                                    Create an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );
};

export default SignIn;
