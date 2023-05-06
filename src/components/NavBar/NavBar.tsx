import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import useCart from '../../hooks/useCart';
import useApp from '../../hooks/useApp';
import Mobilenav from './Mobilenav';
import { Button, Divider, MenuItem } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import styled from '@mui/material/styles/styled';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import useAuth from '../../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import Stack from '@mui/material/Stack';
// import { deepOrange, deepPurple } from '@mui/material/colors';
import React from 'react';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const NavBar = () => {
  const { toggleCart, cartQuantity } = useCart();
  const { auth, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { openMenu, toggleMenu } = useApp();

  const handleCart = () => {
    window.scrollTo(0, 0);
    return toggleCart();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_title}>
        <MenuOutlinedIcon className={styles.mobile_menu} onClick={toggleMenu} />
        <Link to="/">
          <h2>FastStore</h2>
        </Link>
      </div>
      {openMenu && <Mobilenav />}
      <ul className={styles.navbar_general}>
        <Link to="/products">Product</Link>
        <Link to="/categories">Categories</Link>
        <Link to="">Contact</Link>
      </ul>
      <div className={styles.navbar_auth}>
        <div className={styles.cart} onClick={handleCart}>
          <IconButton aria-label="cart" style={{ backgroundColor: '#fff' }}>
            <StyledBadge badgeContent={cartQuantity} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </div>
        {!auth?.isLoggedIn ? (
          <Button
            variant="outlined"
            style={{ backgroundColor: '#fff' }}
            onClick={() =>
              navigate('/login', { state: location.pathname, replace: true })
            }
          >
            Login
          </Button>
        ) : (
          <div>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar>{auth?.user?.username}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={PaperProps}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </nav>
  );
};

const PaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

export default NavBar;
