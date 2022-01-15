import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Divider, Link, Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    var user = localStorage.getItem('user')
    var OrderedItemCount = localStorage.getItem('itemCount')
    var status = false;

    //navbar menu will be toggeled (user is logged-in or not)
    if (user != null) {
        status = true;
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const RenderMobileMenu = () => {
        //if the status is true 
        if (status) {
            return (
                <>
                    <MenuItem>
                        <Link href='/fetch-cart'>
                            <IconButton size="large" color="inherit">
                                <Badge badgeContent={OrderedItemCount ? OrderedItemCount : 0} color="error" showZero>
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='/profile'>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='/logout'>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Logout />
                            </IconButton>
                        </Link>

                    </MenuItem>
                </>
            )
        }
        else {
            return (
                <>
                    <MenuItem>
                        <Link href='/sign-up'>
                            <Button >
                                Signup
                            </Button>
                        </Link>
                    </MenuItem>
                    <hr />
                    <MenuItem>
                        <Link href='/sign-in'>
                            <Button >
                                Signin
                            </Button>
                        </Link>
                    </MenuItem>
                </>
            )
        }
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <RenderMobileMenu />
        </Menu>
    );

    const fetchCart = () => {
        window.location = '/fetch-cart'
    }

    const RenderMenu = () => {
        //if the status is true
        if (status) {
            return (
                <>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="large"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <AccountCircle style={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 3,
                                    width: "10%",
                                    marginLeft: '84%',
                                    '& .MuiAvatar-root': {
                                        width: 25,
                                        height: 20,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 35,
                                        width: 20,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Link href='/profile'>
                                    <ListItemIcon>
                                        <Avatar fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <Link href='/logout'>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </Link>
                            </MenuItem>
                        </Menu>

                        <IconButton size="large" color="inherit" onClick={fetchCart}>
                            <Badge badgeContent={OrderedItemCount ? OrderedItemCount : 0} color="error" showZero>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>

                </>
            )

        }
        else {
            return (
                <>
                    <Link href='/sign-up'>
                        <Button style={{ color: 'white' }}>
                            Signup
                        </Button>
                    </Link>
                    <Link href='/sign-in'>
                        <Button style={{ color: 'white' }}>
                            Signin
                        </Button>
                    </Link>
                </>
            )
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' style={{ width: '100%', backgroundColor: '#3f51b5', color: 'white' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => history("/")}
                    >
                        <MenuBookIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Book Store
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    {/* here we are checking that user is loggedin or not , according to that we will toggle button  in the nav baar */}
                    <RenderMenu />

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
