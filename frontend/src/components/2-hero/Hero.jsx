import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Chip,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import {
  Verified as VerifiedIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  Rocket as RocketIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

// @ts-ignore
import developerAnimation from "../../../public/animations/developer.json";

const Hero = () => {
  const lottieRef = useRef();
  const { isDark } = useTheme();

  const techStacks = [
    {
      category: "Desktop & Database",
      icon: "🖥️",
      color: "primary",
      technologies: ["WinForms", "VB.NET", "C#", "SQL Server", "Crystal Reports"]
    },
    {
      category: "Web Development",
      icon: "🌐",
      color: "secondary",
      technologies: ["C#", "ASP.NET Core API", "Blazor Server", "WebAssembly", "MVC", "Razor Pages"]
    },
    {
      category: "Frontend",
      icon: "⚛️",
      color: "info",
      technologies: ["Html", "Css", "js", "React.js", "JavaScript", "Responsive Design"]
    }
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: "GitHub", href: "#" },
    { icon: <LinkedInIcon />, label: "LinkedIn", href: "#" },
    { icon: <TwitterIcon />, label: "Twitter", href: "#" },
    { icon: <InstagramIcon />, label: "Instagram", href: "#" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper
        elevation={3}
        sx={{
          mt: 5,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: isDark
            ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(135deg, rgba(33,150,243,0.08) 0%, rgba(33,150,243,0.02) 100%)",
          backdropFilter: "blur(20px)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(33,150,243,0.12)",
          boxShadow: isDark
            ? "0 20px 40px rgba(0,0,0,0.3)"
            : "0 20px 40px rgba(33,150,243,0.15)"
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* Profile Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={3} alignItems="center">
              {/* Avatar & Info */}
              <Grid size={{ xs: 12, sm: 8 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  textAlign={{ xs: "center", sm: "left" }}
                >
                  <Box sx={{ position: "relative" }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 5,
                        delay: 0.2
                      }}
                    >
                      <Avatar
                        src="./mypic.png"
                        alt="Profile"
                        sx={{
                          width: { xs: 80, sm: 100 },
                          height: { xs: 80, sm: 100 },
                          border: 2,
                          borderColor: "primary.main",
                          boxShadow: isDark
                            ? "0 0 0 3px rgba(33, 150, 243, 0.2), 0 8px 24px rgba(0, 0, 0, 0.3)"
                            : "0 0 0 3px rgba(33, 150, 243, 0.1), 0 8px 24px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          }
                        }}
                      />
                    </motion.div>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        right: 4,
                        backgroundColor: "primary.main",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 2
                      }}
                    >
                      <VerifiedIcon sx={{ color: "white", fontSize: 14 }} />
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        mb: 0.5,
                        fontSize: "0.9rem"
                      }}
                    >
                      👋 Hello, I'm
                    </Typography>

                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.20rem" },
                        lineHeight: 1.2,
                        background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      Shaban Elmogy
                    </Typography>

                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: { xs: "0.9rem", sm: "1.1rem" },
                        mb: 1
                      }}
                    >
                      Full-Stack Developer
                    </Typography>

                    {/* Quick Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        display: { xs: "none", sm: "block" }
                      }}
                    >
                      Passionate developer creating{" "}
                      <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                        robust, scalable applications
                      </Box>{" "}
                      with modern technologies.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Lottie Animation */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: { xs: 150, sm: 180 },
                        filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.1))"
                      }}
                    >
                      <Lottie
                        animationData={developerAnimation}
                        lottieRef={lottieRef}
                        onLoadedImages={() => {
                          // @ts-ignore
                          lottieRef.current?.setSpeed(0.5);
                        }}
                        style={{
                          width: "100%",
                          height: "auto"
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>

          {/* Tech Stack - Compact */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <RocketIcon sx={{ color: "primary.main", fontSize: 20 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: "1.1rem"
                  }}
                >
                  Tech Stack
                </Typography>
              </Stack>

              <Stack spacing={2}>
                {techStacks.map((stack, index) => (
                  <Box key={index}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Typography sx={{ fontSize: "1rem" }}>
                        {stack.icon}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          fontSize: "0.85rem"
                        }}
                      >
                        {stack.category}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                      {stack.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          color={stack.color}
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            height: 24,
                            "&:hover": {
                              transform: "scale(1.05)"
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action - Compact */}
        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Button
                variant="contained"
                size="medium"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 2.5,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 16px rgba(33, 150, 243, 0.4)"
                  }
                }}
              >
                View My Work
              </Button>

              <Button
                variant="outlined"
                size="medium"
                endIcon={<EmailIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 2.5,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }
                }}
              >
                Get In Touch
              </Button>
            </Stack>

            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    border: 1,
                    borderColor: "divider",
                    color: "text.secondary",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      borderColor: "primary.main",
                      color: "white",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Hero;