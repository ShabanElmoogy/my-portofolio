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
          right: 20,
          zIndex: 1000,
          width: 40,
          height: 40,
          minHeight: 40,
          background: 'rgba(128, 128, 128, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          opacity: 0.3,
          '&:hover': {
            opacity: 0.7,
            background: 'rgba(128, 128, 128, 0.2)',
            backdropFilter: 'blur(15px)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease-in-out',
          '& .MuiSvgIcon-root': {
            fontSize: '1.2rem',
            color: 'rgba(128, 128, 128, 0.6)',
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