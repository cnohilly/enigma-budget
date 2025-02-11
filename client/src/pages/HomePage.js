// HomePage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h2" color="primary" gutterBottom>
                Home Page
            </Typography>
            <Typography variant="body1" color="text.primary">
                Welcome to the home page!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
        </Container>
    );
};

export default HomePage;
