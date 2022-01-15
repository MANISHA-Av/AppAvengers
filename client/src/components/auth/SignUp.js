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

const SignUp = () => {
    const [user, setUser] = useState({
        fullname: "", username: "", email: "", password: "", confirmPassword: ""
    })
    console.log("manid", user.username);
    let name, value;

    //on input change
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    //for form validation
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    //sign-up button
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        axios.post('http://localhost:5000/sign-up', data)
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location='/'
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
                            Sign Up
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    type='text'
                                    id="fullname"
                                    name="fullname"
                                    label="Full Name"
                                    fullWidth
                                    onChange={handleChange}
                                    margin="dense"
                                    {...register('fullname')}
                                    error={errors.fullname ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.fullname?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="username"
                                    name="username"
                                    label="Username"
                                    fullWidth
                                    onChange={handleChange}
                                    margin="dense"
                                    {...register('username')}
                                    error={errors.username ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.username?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    onChange={handleChange}
                                    margin="dense"
                                    {...register('confirmPassword')}
                                    error={errors.confirmPassword ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.confirmPassword?.message}
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
                                Register
                            </Button>
                        </Box>
                        <Grid style={{ marginTop: '5%' }} container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2" >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );
};

export default SignUp;
