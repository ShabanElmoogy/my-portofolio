import { AppBar, Toolbar, Typography, Avatar, IconButton, Button, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const AdminHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={2}>
      <Toolbar>
        <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>A</Avatar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        
        <Tooltip title="Go to Home Page">
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={handleHomeClick}
            sx={{ 
              mr: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Home
          </Button>
        </Tooltip>

        <Tooltip title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            sx={{ ml: 1 }}
          >
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;