import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  List as ListIcon
} from '@mui/icons-material';

const AdminNavButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Admin Panel" placement="left">
        <Fab
          color="secondary"
          aria-label="admin"
          onClick={handleClick}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            zIndex: 1000,
            backgroundColor: '#9c27b0',
            '&:hover': {
              backgroundColor: '#7b1fa2'
            }
          }}
        >
          <SettingsIcon />
        </Fab>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleNavigation('/admin')}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Admin Dashboard</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/admin/projects')}>
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Projects</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AdminNavButton;