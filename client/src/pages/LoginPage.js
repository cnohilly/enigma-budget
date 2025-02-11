import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AuthPage = () => {
    // Mode can be 'login' or 'register'
    const [mode, setMode] = useState('login');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        shouldUnregister: true
    });
    const navigate = useNavigate();

    console.log(errors);

    // Called on form submission
    const onSubmit = async (data) => {
        console.log('login');
        if (mode === 'login') {
            try {
                const response = await axios.post('/api/auth/login', data);
                console.log('Login successful:', response.data);
                // Handle authentication tokens, etc.
                navigate('/home');
            } catch (error) {
                console.error('Login error:', error.response?.data || error.message);
            }
        } else {
            try {
                const response = await axios.post('/api/auth/register', data);
                console.log('Registration successful:', response.data);
                // You could auto-login here or switch modes.
                navigate('/home');
            } catch (error) {
                console.error('Registration error:', error.response?.data || error.message);
            }
        }
    };

    // Toggle between login and register mode
    const toggleMode = () => {
        setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <Typography variant="h3" align="center" color="primary">
                    {mode === 'login' ? 'Login' : 'Register'}
                </Typography>

                {/* Render the registration fields if in register mode */}
                {mode === 'register' && (
                    <>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            required
                            {...register('username', {
                                required: 'Username is required',
                                minLength: { value: 3, message: 'Username must have at least 3 characters' },
                            })}
                            error={Boolean(errors.username)}
                            helperText={errors.username ? errors.username.message : ''}
                        />

                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Entered value does not match email format',
                                },
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email.message : ''}
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            required
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must have at least 6 characters' },
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password ? errors.password.message : ''}
                        />

                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{ style: { color: '#ffffff' } }}
                            {...register('firstName')}
                        />

                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{ style: { color: '#ffffff' } }}
                            {...register('lastName')}
                        />
                    </>
                )}

                {/* Render the login fields if in login mode */}
                {mode === 'login' && (
                    <>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Entered value does not match email format',
                                },
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email.message : ''}
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            required
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{ style: { color: '#ffffff' } }}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must have at least 6 characters' },
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                    </>
                )}

                <Button variant="contained" type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
                    {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </Button>

                <Typography align="center">
                    {mode === 'login'
                        ? "Don't have an account? "
                        : 'Already have an account? '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={toggleMode}
                        sx={{ color: '#2196f3' }}
                    >
                        {mode === 'login' ? 'Register here' : 'Login here'}
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default AuthPage;
