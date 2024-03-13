import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1f2937', width: '100%'  }}>
      <Container maxWidth="md">
        <Typography variant="body1" align="center" p={4} color="#FFF">
          &copy; 2024 Your Company Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer