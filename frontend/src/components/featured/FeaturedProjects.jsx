import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
  Stack
} from "@mui/material";
import {
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import { API_URL as API_BASE } from "../admin/utils/constants";

const FEATURED_PROJECTS_URL = `${API_BASE}/projects/featured`;

const FeaturedProjects = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(FEATURED_PROJECTS_URL, { method: "GET" });
      const data = await res.json();
      setFeaturedProjects(data);
    } catch (err) {
      console.error("Failed to fetch featured projects:", err);
      setFeaturedProjects([]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Featured Projects
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: 'center', mb: 4 }}
        >
          Showcasing our most important and innovative work
        </Typography>
        <Grid container spacing={4}>
          {[...Array(3)].map((_, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card sx={{ borderRadius: 3 }}>
                <Skeleton variant="rectangular" height={300} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Skeleton variant="text" height={16} width="80%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 2 }} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Featured Projects
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: 'center', mb: 4 }}
        >
          No featured projects available at the moment
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Featured Projects
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Showcasing our most important and innovative work
        </Typography>
      </Box>

      {/* Featured Projects Grid */}
      <AnimatePresence>
        <Grid container spacing={4}>
          {featuredProjects.map((project, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'background.paper',
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    boxShadow: isDark
                      ? '0 8px 32px rgba(0,0,0,0.3)'
                      : '0 8px 32px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: isDark
                        ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(33,150,243,0.2)'
                        : '0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(33,150,243,0.1)',
                    },
                    '&:hover .card-overlay': {
                      opacity: 1,
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={project.imgPath}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <Box
                      className="card-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                      }}
                    >
                      <Tooltip title="View Live Demo">
                        <IconButton
                          size="large"
                          sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.3)',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Source Code">
                        <IconButton
                          size="large"
                          sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.3)',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    {/* Featured Badge */}
                    <Chip
                      icon={<StarIcon />}
                      label="Featured"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                        backgroundColor: '#ffa000',
                        color: 'white',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        lineHeight: 1.3
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/* Business Type & Category */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      {project.businessType && (
                        <Chip
                          label={project.businessType.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'info.main',
                            color: 'info.main',
                            fontSize: '0.75rem'
                          }}
                        />
                      )}
                      {project.category && (
                        <Chip
                          label={project.category.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontSize: '0.75rem'
                          }}
                        />
                      )}
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {project.description || "A featured project showcasing cutting-edge technologies and innovative solutions."}
                    </Typography>

                    {/* Technologies */}
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {project.technologies && project.technologies.length > 0 ? (
                        project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech.name || tech}
                            size="small"
                            variant="filled"
                            sx={{
                              backgroundColor: 'secondary.main',
                              color: 'secondary.contrastText',
                              fontSize: '0.75rem',
                              '&:hover': {
                                backgroundColor: 'secondary.dark'
                              }
                            }}
                          />
                        ))
                      ) : null}
                      {project.technologies && project.technologies.length > 4 && (
                        <Chip
                          label={`+${project.technologies.length - 4} more`}
                          size="small"
                          variant="outlined"
                          color="secondary"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      fullWidth
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Navigating to featured project:', project.id);
                        navigate(`/project/${project.id}`);
                      }}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        background: isDark
                          ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                          : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                          background: isDark
                            ? 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                            : 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                          transform: 'translateY(-2px)',
                          boxShadow: isDark
                            ? '0 8px 20px rgba(25, 118, 210, 0.4)'
                            : '0 8px 20px rgba(33, 150, 243, 0.3)'
                        }
                      }}
                    >
                      View Project
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>
    </Container>
  );
};

export default FeaturedProjects;