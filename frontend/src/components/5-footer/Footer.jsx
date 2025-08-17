import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
  useTheme,
  Paper
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  const contactInfo = [
    { icon: <EmailIcon />, label: "shaban.prog2021@gmail.com", href: "mailto:shaban.prog2021@gmail.com" },
    { icon: <PhoneIcon />, label: "+201033982989  +201284555561", href: "tel:+15551234567" },
    { icon: <LocationIcon />, label: "Port-Said, Egypt", href: "#" }
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, url: "https://www.linkedin.com/in/shaban-elmogy-42310731a", color: "#0077B5", label: "LinkedIn" },
    { icon: <GitHubIcon />, url: "https://github.com/ShabanElmoogy", color: "#333", label: "GitHub" },
    { icon: <Box component="img" src="/qabilah.PNG" alt="Qabilah" sx={{ width: 18, height: 18, borderRadius: '4px', display: 'block' }} />, url: "https://qabilah.com/profile/shaban-elmogy-42310731a/posts", color: "#ffffff", label: "Qabilah" },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "#resume" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)'
          : 'linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0.02) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: theme.palette.mode === 'dark'
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(33,150,243,0.1)',
        py: 4,
        mt: 6
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Brand Card */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(33,150,243,0.05)',
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(33,150,243,0.1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,0,0,0.1)'
                  : '0 4px 20px rgba(33,150,243,0.05)',
                height: '100%'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.2rem'
                }}
              >
                Portfolio
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}
              >
                Creating innovative solutions through modern web technologies and clean design.
              </Typography>
            </Paper>
          </Grid>

          {/* Quick Links Card */}
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(33,150,243,0.05)',
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(33,150,243,0.1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,0,0,0.1)'
                  : '0 4px 20px rgba(33,150,243,0.05)',
                height: '100%'
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'text.primary',
                  fontSize: '0.95rem'
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'action.hover',
                        transform: 'translateX(4px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Contact Card */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(33,150,243,0.05)',
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(33,150,243,0.1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,0,0,0.1)'
                  : '0 4px 20px rgba(33,150,243,0.05)',
                height: '100%'
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'text.primary',
                  fontSize: '0.95rem'
                }}
              >
                Get In Touch
              </Typography>
              <Stack spacing={1}>
                {contactInfo.map((info, index) => (
                  <Link
                    key={index}
                    href={info.href}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'text.secondary',
                      textDecoration: 'none',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'action.hover',
                        transform: 'translateX(4px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Box
                      sx={{
                        color: 'primary.main',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.8rem' }}
                    >
                      {info.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Social Card */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(33,150,243,0.05)',
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(33,150,243,0.1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,0,0,0.1)'
                  : '0 4px 20px rgba(33,150,243,0.05)',
                height: '100%'
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'text.primary',
                  fontSize: '0.95rem'
                }}
              >
                Follow Me
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      backgroundColor: social.color,
                      color: 'white',
                      width: 32,
                      height: 32,
                      boxShadow: `0 2px 8px ${social.color}30`,
                      '&:hover': {
                        backgroundColor: social.color,
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow: `0 4px 12px ${social.color}40`
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>

              {/* Social Labels */}
              <Box sx={{ mt: 1.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem' }}
                >
                  Connect with me on social platforms
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 3,
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(33,150,243,0.1)'
          }}
        />

        {/* Copyright - Enhanced */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            px: 1
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.75rem' }}
          >
            © 2024 Portfolio. All rights reserved.
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.75rem' }}
          >
            Made with ❤️ using React & Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;