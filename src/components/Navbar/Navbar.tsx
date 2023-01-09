import { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { authContext } from '../../helpers/authContext';
import { auth, storage } from '../../helpers/firebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import HomePage from '../HomePage/HomePage';

// const pages = ['Home', 'Search'];
const settings = ['Profile', 'Logout'];

const Navbar = () => {
    const loggedIn = useContext(authContext);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | undefined>('/')

    useEffect(() => {
        if (loggedIn && auth.currentUser) {
            const storageRef = ref(storage, `/users/${auth.currentUser.uid}/profilePhoto`);

            getDownloadURL(storageRef)
                .then((url) => setProfilePhoto(url))
                .catch((err) => console.error(err.message));
            // lub
            // .catch((err) => setProfilePhoto(undefined)); do renderowania warunkowego
        }
    }, [loggedIn]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#81007F" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Dictionary App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Link to='/' style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </Link>
                            <Link to='/search' style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Search</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Dictionary App
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                        <Link to='/' style={{ textDecoration: "none", color: 'white', display: 'block' }}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                        </Link>
                        <Link to='/search' style={{ textDecoration: "none", color: 'white', display: 'block' }}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Search</Typography>
                            </MenuItem>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {loggedIn ?
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={profilePhoto} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {/* {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))} */}

                                    <Link to='/user' style={{ textDecoration: "none", color: "black" }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Link to='/' style={{ textDecoration: "none", color: "black" }}>
                                        <MenuItem onClick={() => signOut(auth)}>
                                            <Typography textAlign="center">Log out</Typography>
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </> : <Link to='/login' style={{ color: "white", display: "block", textDecoration: 'none', fontWeight: 'bold' }}>LOG IN</Link>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Navbar