import { useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import AdminLoginDialog from './AdminLoginDialog';

const AdminLoginButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Fab
        aria-label="admin login"
        onClick={handleOpenDialog}
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 1000,
          width: 32,
          height: 32,
          minHeight: 32,
          background: 'transparent',
          backdropFilter: 'none',
          border: 'none',
          boxShadow: 'none',
          opacity: 0.05,
          '&:hover': {
            opacity: 0.3,
            background: 'rgba(128, 128, 128, 0.05)',
            backdropFilter: 'blur(5px)',
            transform: 'scale(1.05)',
            boxShadow: 'none',
          },
          '&:active': {
            opacity: 0.5,
            transform: 'scale(0.95)',
          },
          transition: 'all 0.4s ease-in-out',
          '& .MuiSvgIcon-root': {
            fontSize: '1rem',
            color: 'rgba(128, 128, 128, 0.3)',
          },
          // Hide completely on small screens to avoid accidental clicks
          '@media (max-width: 768px)': {
            display: 'none',
          },
        }}
      >
        <AdminPanelSettings />
      </Fab>

      <AdminLoginDialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
      />
    </>
  );
};

export default AdminLoginButton;