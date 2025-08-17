import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
  Slide,
  LinearProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Lock,
  Person,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const AdminLoginDialog = ({ open, onClose }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, isDark } = useTheme();

  // Admin credentials from environment variables
  const ADMIN_CREDENTIALS = {
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123',
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Store admin session (in production, use proper authentication)
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      
      // Navigate to admin panel
      navigate('/admin');
      onClose();
      
      // Reset form
      setCredentials({ username: '', password: '' });
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    setCredentials({ username: '', password: '' });
    setError('');
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="xs" 
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: isDark
            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: isDark
            ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            : '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          overflow: 'hidden',
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: isDark 
            ? 'rgba(0, 0, 0, 0.7)' 
            : 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      {/* Loading Progress Bar */}
      {loading && (
        <LinearProgress 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }
          }} 
        />
      )}

      <DialogTitle sx={{ textAlign: 'center', pb: 2, pt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 10,
                delay: 0.2 
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '50%',
                  background: isDark
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(102, 126, 234, 0.3)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    zIndex: -1,
                    opacity: 0.3,
                    filter: 'blur(8px)',
                  }
                }}
              >
                <AdminPanelSettings fontSize="large" />
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ 
                background: isDark
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}>
                Admin Access
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Secure authentication required
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            {/* Hidden dummy fields to prevent autofill */}
            <input type="text" style={{ display: 'none' }} />
            <input type="password" style={{ display: 'none' }} />
            
            {error && (
              <Fade in={!!error}>
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
                    color: isDark ? '#ff6b6b' : 'inherit',
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="admin-username-field"
              label="Username"
              name="username"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                'data-form-type': 'other',
                'data-lpignore': 'true',
                'data-1p-ignore': 'true',
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'primary.main',
                    transform: 'translateY(-1px)',
                    boxShadow: isDark
                      ? '0 4px 20px rgba(102, 126, 234, 0.2)'
                      : '0 4px 20px rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 1)',
                    borderColor: 'primary.main',
                    boxShadow: isDark
                      ? '0 0 0 2px rgba(102, 126, 234, 0.3)'
                      : '0 0 0 2px rgba(102, 126, 234, 0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                },
                '& .MuiOutlinedInput-input': {
                  color: isDark ? 'white' : 'inherit',
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="admin-password-field"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={credentials.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                'data-form-type': 'other',
                'data-lpignore': 'true',
                'data-1p-ignore': 'true',
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'primary.main',
                    transform: 'translateY(-1px)',
                    boxShadow: isDark
                      ? '0 4px 20px rgba(102, 126, 234, 0.2)'
                      : '0 4px 20px rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 1)',
                    borderColor: 'primary.main',
                    boxShadow: isDark
                      ? '0 0 0 2px rgba(102, 126, 234, 0.3)'
                      : '0 0 0 2px rgba(102, 126, 234, 0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                },
                '& .MuiOutlinedInput-input': {
                  color: isDark ? 'white' : 'inherit',
                },
              }}
            />
          </Box>
        </motion.div>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={handleClose} 
            variant="outlined"
            disabled={loading}
            sx={{ 
              borderRadius: 3, 
              minWidth: 100,
              borderColor: isDark 
                ? 'rgba(102, 126, 234, 0.5)' 
                : 'rgba(102, 126, 234, 0.3)',
              color: isDark ? '#8fa7ff' : '#667eea',
              backgroundColor: isDark 
                ? 'rgba(102, 126, 234, 0.05)' 
                : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#667eea',
                background: isDark
                  ? 'rgba(102, 126, 234, 0.1)'
                  : 'rgba(102, 126, 234, 0.05)',
                transform: 'translateY(-1px)',
                boxShadow: isDark
                  ? '0 4px 15px rgba(102, 126, 234, 0.2)'
                  : '0 4px 15px rgba(102, 126, 234, 0.1)',
              },
              '&:disabled': {
                opacity: 0.5,
              },
            }}
          >
            Cancel
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !credentials.username || !credentials.password}
            sx={{ 
              borderRadius: 3, 
              minWidth: 100,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: isDark
                ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                : '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                boxShadow: isDark
                  ? '0 6px 20px rgba(102, 126, 234, 0.5)'
                  : '0 6px 20px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.12)' 
                  : 'rgba(0, 0, 0, 0.12)',
                color: isDark 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(0, 0, 0, 0.26)',
                boxShadow: 'none',
              },
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
};

export default AdminLoginDialog;