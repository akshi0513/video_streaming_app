
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" className="navbar-container"> {/* Added class */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="navbar-title"> {/* Added class */}
          Video Streaming App
        </Typography>
        {user ? (
          <>
            <Button className="navbar-button" color="inherit" component={Link} to="/">Videos</Button>
            <Button className="navbar-button" color="inherit" component={Link} to="/upload">Upload</Button>
            <Button className="navbar-button" color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button className="navbar-button" color="inherit" component={Link} to="/auth">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
