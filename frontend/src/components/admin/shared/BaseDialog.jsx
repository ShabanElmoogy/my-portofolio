import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const BaseDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  title, 
  children, 
  loading = false,
  submitText = 'Save',
  cancelText = 'Cancel',
  maxWidth = 'sm',
  error = '',
  isValid = true,
  showCloseIcon = true
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark 
            ? 'rgba(30, 30, 30, 0.95)' 
            : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: isDark 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isDark 
            ? '0 20px 40px rgba(0, 0, 0, 0.5)' 
            : '0 20px 40px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: isDark 
            ? 'rgba(0, 0, 0, 0.6)' 
            : 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontWeight: 700,
          fontSize: '1.5rem',
          pb: 2,
          pt: 3,
          px: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5" component="span" sx={{ 
          fontWeight: 'inherit',
          background: 'inherit',
          backgroundClip: 'inherit',
          WebkitBackgroundClip: 'inherit',
          WebkitTextFillColor: 'inherit',
        }}>
          {title}
        </Typography>
        {showCloseIcon && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: isDark 
                ? 'rgba(255, 255, 255, 0.7)' 
                : 'rgba(0, 0, 0, 0.54)',
              '&:hover': {
                backgroundColor: isDark 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3, pb: 1 }}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              background: isDark 
                ? 'rgba(244, 67, 54, 0.15)' 
                : 'rgba(244, 67, 54, 0.1)',
              border: isDark 
                ? '1px solid rgba(244, 67, 54, 0.3)' 
                : '1px solid rgba(244, 67, 54, 0.2)',
              color: isDark 
                ? '#ffcdd2' 
                : 'inherit',
              '& .MuiAlert-icon': {
                color: isDark 
                  ? '#f44336' 
                  : 'inherit',
              },
            }}
          >
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {children}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderRadius: 3, 
            minWidth: 100,
            borderColor: isDark 
              ? 'rgba(102, 126, 234, 0.5)' 
              : 'rgba(102, 126, 234, 0.3)',
            color: isDark 
              ? '#8fa4f3' 
              : '#667eea',
            fontWeight: 500,
            '&:hover': {
              borderColor: isDark 
                ? '#8fa4f3' 
                : '#667eea',
              background: isDark 
                ? 'rgba(102, 126, 234, 0.1)' 
                : 'rgba(102, 126, 234, 0.05)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !isValid}
          sx={{ 
            borderRadius: 3, 
            minWidth: 100,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: isDark 
              ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
              : '0 4px 15px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              boxShadow: isDark 
                ? '0 6px 20px rgba(102, 126, 234, 0.5)' 
                : '0 6px 20px rgba(102, 126, 234, 0.4)',
            },
            '&:disabled': {
              background: isDark 
                ? 'rgba(255, 255, 255, 0.12)' 
                : 'rgba(0, 0, 0, 0.12)',
              color: isDark 
                ? 'rgba(255, 255, 255, 0.3)' 
                : 'rgba(0, 0, 0, 0.26)',
            },
          }}
        >
          {loading ? 'Saving...' : submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;