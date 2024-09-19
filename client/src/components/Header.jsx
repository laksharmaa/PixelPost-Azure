import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import logo from '../assets/logo.png';

const Header = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <AppBar position="static" style={{ backgroundColor: '#1a202c' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={logo}
              alt='logo'
              style={{ height: '48px', marginRight: '16px' }}
            />
          </Link>

          {isAuthenticated && (
            <>
              {location.pathname !== '/profile' && (
                <Button color="inherit" component={Link} to="/profile">
                  My Profile
                </Button>
              )}
              {location.pathname !== '/create-post' && (
                <Button color="inherit" component={Link} to="/create-post">
                  Create Post
                </Button>
              )}
            </>
          )}
        </Box>

        <Box>
          {isAuthenticated ? (
            <Button color="secondary" variant="contained" onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </Button>
          ) : (
            <Button color="success" variant="contained" onClick={() => loginWithPopup({ connection: 'google-oauth2' })}>
              Log In with Google
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
