import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#1f2937' }} >
      <Toolbar>
        <Container sx={{ width: '100%' }} >
          <Typography variant="h4" p={4} sx={{ color: '#FFF', textAlign:"center" , fontWeight:700}}>
            NEWS FEED
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Header