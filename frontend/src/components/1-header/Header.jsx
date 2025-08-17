import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Stack,
  Paper,
  useMediaQuery,
  useTheme as useMuiTheme,
  Divider
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Code as CodeIcon
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cycle through tech stack
  useEffect(() => {
    const techTimer = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techStack.length);
    }, 2500);

    return () => clearInterval(techTimer);
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setShowModal(false);
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const navigationItems = [
    { label: 'About', sectionId: 'up' },
    { label: 'Featured', sectionId: 'featured-projects' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  const techStack = ['React', 'Node.js', 'C#', 'ASP.NET', 'JavaScript', 'SQL Server', 'MongoDB', 'Blazor'];

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          mt: 2,
          px: 3,
          borderRadius: 2
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setShowModal(true)}
              sx={{
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Left Section - Clean Dynamic Content */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Live Clock */}
              <Paper
                elevation={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-1px)',
                    boxShadow: 2
                  }
                }}
              >
                <TimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: 'text.primary',
                    minWidth: 45
                  }}
                >
                  {formatTime(currentTime)}
                </Typography>
              </Paper>

              {/* Location */}
              <Paper
                elevation={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    transform: 'translateY(-1px)',
                    boxShadow: 2
                  }
                }}
              >
                <LocationIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  Remote
                </Typography>
              </Paper>

              {/* Current Tech - Fixed Width */}
              <Paper
                elevation={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  width: 140,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'success.main',
                    transform: 'translateY(-1px)',
                    boxShadow: 2
                  }
                }}
              >
                <CodeIcon sx={{ fontSize: 18, color: 'success.main', flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    transition: 'opacity 0.3s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1
                  }}
                  key={currentTechIndex}
                >
                  {techStack[currentTechIndex]}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Center - Desktop Navigation */}
          {!isMobile && (
            <Paper
              elevation={1}
              sx={{
                borderRadius: 6,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Stack direction="row" spacing={0} sx={{ px: 1, py: 0.5 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'action.hover',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Right - Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme === "dark" ? 'orange' : 'primary.main',
                transform: 'scale(1.05) rotate(180deg)',
                boxShadow: 2
              }
            }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <LightModeIcon sx={{ color: 'orange' }} />
            ) : (
              <DarkModeIcon sx={{ color: 'primary.main' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={showModal}
        onClose={() => setShowModal(false)}
        PaperProps={{
          sx: {
            width: '75%',
            maxWidth: 300,
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(10px)'
          }
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)'
            }
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Navigation
            </Typography>
            <IconButton
              onClick={() => setShowModal(false)}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(180deg)',
                  color: 'error.main'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Info Cards */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: 'action.hover',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <TimeIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Current Time
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                  {formatTime(currentTime)}
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: 'action.hover',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <CodeIcon sx={{ color: 'success.main' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Currently Working With
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {techStack[currentTechIndex]}
                </Typography>
              </Box>
            </Paper>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Navigation Items */}
          <List>
            {navigationItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => scrollToSection(item.sectionId)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'translateX(8px)'
                    }
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '1rem',
                      fontWeight: 500
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Tech Stack */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Tech Stack
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {techStack.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>
                  3+
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  Years
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>
                  50+
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  Projects
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>
                  100%
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  Success
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;