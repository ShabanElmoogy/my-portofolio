import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  IconButton,
  Paper,
  Grid,
  Card,
  CardMedia,
  Skeleton,
  Stack,
  Divider,
  Tooltip,
  Breadcrumbs,
  Link,
  MobileStepper,
  Collapse,
  Fade,
  Avatar,
  Tabs,
  Tab
} from "@mui/material";
import {
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Star as StarIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PlayArrow as PlayArrowIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Build as BuildIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  PhoneAndroid as MobileIcon,
  Language as WebIcon,
  Tab as TabIcon
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import { API_URL as API_BASE } from "../admin/utils/constants";

const API_URL = `${API_BASE}/projects`;

// Enhanced Description Section Component
const EnhancedDescriptionSection = ({ description, index, isDark }) => {
  const [expanded, setExpanded] = useState(true); // All sections expanded by default in tabs
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  // Get icon based on section title
  const getSectionIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('feature') || titleLower.includes('key')) return <CheckCircleIcon />;
    if (titleLower.includes('technical') || titleLower.includes('tech')) return <CodeIcon />;
    if (titleLower.includes('design') || titleLower.includes('ui')) return <PaletteIcon />;
    if (titleLower.includes('security')) return <SecurityIcon />;
    if (titleLower.includes('performance') || titleLower.includes('speed')) return <SpeedIcon />;
    if (titleLower.includes('mobile')) return <MobileIcon />;
    if (titleLower.includes('web')) return <WebIcon />;
    if (titleLower.includes('overview') || titleLower.includes('about')) return <DescriptionIcon />;
    if (titleLower.includes('highlight')) return <LightbulbIcon />;
    if (titleLower.includes('implementation') || titleLower.includes('build')) return <BuildIcon />;
    if (titleLower.includes('timeline') || titleLower.includes('process')) return <TimelineIcon />;
    return <AssignmentIcon />;
  };

  // Get gradient colors based on index
  const getGradientColors = (index) => {
    const gradients = [
      ['#667eea', '#764ba2'], // Purple-Blue
      ['#f093fb', '#f5576c'], // Pink-Red
      ['#4facfe', '#00f2fe'], // Blue-Cyan
      ['#43e97b', '#38f9d7'], // Green-Teal
      ['#fa709a', '#fee140'], // Pink-Yellow
      ['#a8edea', '#fed6e3'], // Teal-Pink
      ['#ff9a9e', '#fecfef'], // Pink-Light
      ['#a18cd1', '#fbc2eb'], // Purple-Pink
    ];
    return gradients[index % gradients.length];
  };

  const [color1, color2] = getGradientColors(index);

  return (
    <Fade in={animate} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
      <Paper
        elevation={expanded ? 6 : 3}
        sx={{
          mb: 3,
          borderRadius: 3,
          overflow: 'hidden',
          background: isDark 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: expanded ? 'translateY(-2px)' : 'translateY(0)',
          '&:hover': {
            transform: expanded ? 'translateY(-4px)' : 'translateY(-2px)',
            boxShadow: expanded ? 8 : 6
          }
        }}
      >
        {/* Section Header */}
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            p: 3,
            background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
            color: 'white',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
              transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.6s ease'
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                width: 48,
                height: 48
              }}
            >
              {getSectionIcon(description.title)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {description.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  fontWeight: 500
                }}
              >
                {description.points.length} key point{description.points.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Stack>
        </Box>

        {/* Section Content */}
        <Collapse in={expanded} timeout={400}>
          <Box sx={{ p: 3, pt: 2 }}>
            <Stack spacing={2}>
              {description.points.map((point, pointIndex) => (
                <Fade
                  key={pointIndex}
                  in={expanded}
                  timeout={600}
                  style={{ transitionDelay: `${pointIndex * 100}ms` }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
                        : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.05)'
                        : '1px solid rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: `linear-gradient(135deg, ${color1}40 0%, ${color2}40 100%)`,
                        color: color1,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        border: `2px solid ${color1}20`
                      }}
                    >
                      {pointIndex + 1}
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.primary',
                        fontWeight: 400,
                        flex: 1,
                        '& strong': {
                          color: 'primary.main',
                          fontWeight: 600
                        }
                      }}
                    >
                      {point}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Stack>

            {/* Section Footer */}
            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: isDark
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Chip
                label={`Section ${index + 1}`}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${color1}20 0%, ${color2}20 100%)`,
                  color: color1,
                  fontWeight: 600,
                  border: `1px solid ${color1}30`
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}
              >
                Click header to {expanded ? 'collapse' : 'expand'}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Fade>
  );
};

// Tabbed Description Component
const TabbedDescriptions = ({ descriptions, isDark, project }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Group descriptions by category
  const groupedDescriptions = descriptions.reduce((acc, desc) => {
    const category = desc.category || 'Overview';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(desc);
    return acc;
  }, {});

  const baseCategories = Object.keys(groupedDescriptions);
  const categories = ['Main', ...baseCategories];
  const currentCategory = categories[activeTab] || 'Overview';
  const currentDescriptions = groupedDescriptions[currentCategory] || [];

  // Get category icon
  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower === 'main') return <HomeIcon />;
    if (categoryLower.includes('overview')) return <DescriptionIcon />;
    if (categoryLower.includes('feature')) return <CheckCircleIcon />;
    if (categoryLower.includes('technical')) return <CodeIcon />;
    if (categoryLower.includes('implementation')) return <BuildIcon />;
    if (categoryLower.includes('design')) return <PaletteIcon />;
    if (categoryLower.includes('performance')) return <SpeedIcon />;
    return <TabIcon />;
  };

  if (categories.length === 0) {
    return (
      <EnhancedDescriptionSection
        description={{
          title: "About This Project",
          points: [
            "This is an innovative project showcasing modern web development practices and cutting-edge technologies.",
            "Built with attention to detail and user experience in mind.",
            "Demonstrates proficiency in full-stack development and modern design principles."
          ]
        }}
        index={0}
        isDark={isDark}
      />
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Category Tabs */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }
          }}
        >
          {categories.map((category, index) => (
            <Tab 
              key={category} 
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                  {category.toLowerCase() !== 'main' && (
                    <Chip 
                      label={(groupedDescriptions[category]?.length || 0)} 
                      size="small" 
                      color="primary"
                      sx={{ minWidth: 24, height: 20, fontSize: '0.75rem' }}
                    />
                  )}
                </Stack>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 3 }}>
        <Fade in={true} timeout={600} key={activeTab}>
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Avatar
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  width: 40,
                  height: 40
                }}
              >
                {getCategoryIcon(currentCategory)}
              </Avatar>
              {currentCategory}
            </Typography>

            {currentCategory.toLowerCase() === 'main' ? (
              <Box>
                {/* Hero Header inside Main */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'background.paper', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
                        Project Details
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 1, background: 'linear-gradient(45deg, #2196F3, #21CBF3)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {project?.title}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} alignItems="center" sx={{ mb: 1 }}>
                        {project?.businessType && (
                          <Chip label={project.businessType.name} variant="outlined" sx={{ borderColor: 'info.main', color: 'info.main', fontWeight: 600 }} size="small" />
                        )}
                        {project?.category && (
                          <Chip label={project.category.name} variant="outlined" sx={{ borderColor: 'primary.main', color: 'primary.main', fontWeight: 600 }} size="small" />
                        )}
                        <Chip label={project?.featured ? 'Featured' : 'Regular'} size="small" color={project?.featured ? 'warning' : 'default'} variant="filled" />
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Created {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : '-'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">•</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Updated {project?.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : '-'}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'background.paper', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
                        Tech Stack
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {project?.technologies && project.technologies.length > 0 ? (
                          project.technologies.map((tech, index) => (
                            <Chip key={index} label={tech.name || tech} variant="filled" sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', fontWeight: 500, '&:hover': { backgroundColor: 'secondary.dark' } }} size="small" />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">No technologies specified</Typography>
                        )}
                      </Stack>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'background.paper', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
                        Actions
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {project?.previewUrl && (
                          <Button variant="contained" size="medium" startIcon={<LaunchIcon />} onClick={() => window.open(project.previewUrl, '_blank', 'noopener,noreferrer')} sx={{ borderRadius: 3, px: 2, py: 1, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', '&:hover': { background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(33, 150, 243, 0.3)' } }}>
                            Live Demo
                          </Button>
                        )}
                        {project?.githubUrl && (
                          <Button variant="outlined" size="medium" startIcon={<GitHubIcon />} onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')} sx={{ borderRadius: 3, px: 2, py: 1, borderWidth: 2, '&:hover': { borderWidth: 2, transform: 'translateY(-2px)' } }}>
                            Source Code
                          </Button>
                        )}
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>

                              </Box>
            ) : (
              currentDescriptions.map((desc, index) => (
                <EnhancedDescriptionSection
                  key={`${currentCategory}-${index}`}
                  description={desc}
                  index={index}
                  isDark={isDark}
                />
              ))
            )}
          </Box>
        </Fade>
      </Box>
    </Paper>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    console.log('ProjectDetail mounted with ID:', id);
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    fetchProject();
  }, [id]);

  // Additional useEffect to handle scroll restoration
  useEffect(() => {
    // Force scroll to top on component mount
    window.scrollTo(0, 0);

    // Disable scroll restoration for this session
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Cleanup function to restore scroll behavior
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) {
        throw new Error("Project not found");
      }
      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Force immediate scroll to top
    window.scrollTo(0, 0);
    // Navigate back immediately
    navigate(-1);
  };

  const handleGoHome = () => {
    // Force immediate scroll to top
    window.scrollTo(0, 0);
    // Navigate home immediately
    navigate("/");
  };

  const handleOpenUrl = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Helper function to check if URL is a video (YouTube, Vimeo, etc.)
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoPatterns = [
      /youtube\.com\/watch\?v=/,
      /youtube\.com\/embed\//,
      /youtu\.be\//,
      /vimeo\.com\//,
      /dailymotion\.com\//,
      /twitch\.tv\//,
      /\.mp4$/,
      /\.webm$/,
      /\.ogg$/
    ];
    return videoPatterns.some(pattern => pattern.test(url));
  };

  // Helper function to convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return url;

    // YouTube URL conversion
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Vimeo URL conversion
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }

    return url;
  };

  // Create media items array (main image + additional images)
  const getMediaItems = () => {
    const items = [];

    // Add main image/video
    if (project.imgPath) {
      items.push({
        type: isVideoUrl(project.imgPath) ? 'video' : 'image',
        url: project.imgPath,
        embedUrl: getEmbedUrl(project.imgPath),
        alt: project.title,
        title: 'Main Media'
      });
    }

    // Add additional images
    if (project.images && project.images.length > 0) {
      project.images.forEach((image, index) => {
        items.push({
          type: isVideoUrl(image.imageUrl) ? 'video' : 'image',
          url: image.imageUrl,
          embedUrl: getEmbedUrl(image.imageUrl),
          alt: image.altText || `Gallery item ${index + 1}`,
          title: image.altText || `Gallery item ${index + 1}`
        });
      });
    }

    return items;
  };

  const mediaItems = project ? getMediaItems() : [];
  const maxSteps = mediaItems.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3, mb: 4 }} />
        <Skeleton variant="text" height={60} width="70%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={30} width="50%" sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error" gutterBottom>
          {error || "Project not found"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The project you're looking for doesn't exist or has been removed.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: isDark ? "#0a0a0a" : "#fafafa" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link
            component="button"
            variant="body2"
            onClick={handleGoHome}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" }
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
            Home
          </Link>
          <Typography variant="body2" color="text.primary">
            {project.title}
          </Typography>
        </Breadcrumbs>

        {/* Media Gallery Section */}
        {mediaItems.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              mt: 1,
              position: "relative"
            }}
          >
            {/* Gallery Header */}
            <Box
              sx={{
                p: 3,
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "background.paper",
                borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={1}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: 0.5,
                      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Project Gallery
                  </Typography>
                                                    </Box>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={handleGoBack}
                  sx={{ mt: { xs: 1, md: 0 } }}
                >
                  Back to Projects
                </Button>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {maxSteps} media item{maxSteps !== 1 ? 's' : ''} • Images and videos showcasing this project
              </Typography>
            </Box>

            {/* Current Media Item */}
            <Box sx={{ position: "relative", height: 550 }}>
              {mediaItems[activeStep]?.type === 'video' ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundColor: "#000"
                  }}
                >
                  <iframe
                    src={mediaItems[activeStep].embedUrl}
                    title={mediaItems[activeStep].title}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      border: "none",
                      borderRadius: "inherit"
                    }}
                  />
                  {/* Video Indicator */}
                  <Chip
                    icon={<PlayArrowIcon />}
                    label="Video Content"
                    size="medium"
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: "white",
                      fontWeight: "bold",
                      "& .MuiChip-icon": { color: "white" }
                    }}
                  />
                </Box>
              ) : (
                <CardMedia
                  component="img"
                  height="550"
                  image={mediaItems[activeStep]?.url}
                  alt={mediaItems[activeStep]?.alt}
                  sx={{ objectFit: "cover" }}
                />
              )}

              {/* Navigation Arrows */}
              {maxSteps > 1 && (
                <>
                  <IconButton
                    onClick={handleBack}
                    sx={{
                      position: "absolute",
                      left: 20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      width: 56,
                      height: 56,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        transform: "translateY(-50%) scale(1.1)"
                      }
                    }}
                  >
                    <KeyboardArrowLeft sx={{ fontSize: 32 }} />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: "absolute",
                      right: 20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      width: 56,
                      height: 56,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        transform: "translateY(-50%) scale(1.1)"
                      }
                    }}
                  >
                    <KeyboardArrowRight sx={{ fontSize: 32 }} />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Media Stepper */}
            {maxSteps > 1 && (
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "background.paper",
                  py: 2,
                  "& .MuiMobileStepper-dot": {
                    backgroundColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                    width: 12,
                    height: 12,
                    margin: "0 4px"
                  },
                  "& .MuiMobileStepper-dotActive": {
                    backgroundColor: "primary.main"
                  }
                }}
                nextButton={
                  <Button
                    size="medium"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                    sx={{ fontWeight: 600 }}
                  >
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button
                    size="medium"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ fontWeight: 600 }}
                  >
                    <KeyboardArrowLeft />
                    Previous
                  </Button>
                }
              />
            )}

            {/* Thumbnail Navigation */}
            {maxSteps > 1 && (
              <Box
                sx={{
                  p: 3,
                  backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}
                >
                  Quick Navigation
                </Typography>
                <Grid container spacing={2}>
                  {mediaItems.map((item, index) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
                      <Card
                        sx={{
                          borderRadius: 2,
                          cursor: 'pointer',
                          border: activeStep === index ? '3px solid' : '3px solid transparent',
                          borderColor: activeStep === index ? 'primary.main' : 'transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 6
                          }
                        }}
                        onClick={() => setActiveStep(index)}
                      >
                        <Box sx={{ position: 'relative' }}>
                          {item.type === 'video' ? (
                            <Box
                              sx={{
                                height: 100,
                                backgroundColor: '#000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                              }}
                            >
                              <PlayArrowIcon sx={{ color: 'white', fontSize: 40 }} />
                              <Typography
                                variant="caption"
                                sx={{
                                  position: 'absolute',
                                  bottom: 6,
                                  left: 6,
                                  color: 'white',
                                  backgroundColor: 'rgba(0,0,0,0.8)',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  fontSize: '0.75rem',
                                  fontWeight: 600
                                }}
                              >
                                VIDEO
                              </Typography>
                            </Box>
                          ) : (
                            <CardMedia
                              component="img"
                              height="100"
                              image={item.url}
                              alt={item.alt}
                              sx={{ objectFit: "cover" }}
                            />
                          )}
                          {activeStep === index && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(33, 150, 243, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Chip
                                label="Current"
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 'bold' }}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ p: 1 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              display: 'block',
                              textAlign: 'center',
                              color: activeStep === index ? 'primary.main' : 'text.secondary'
                            }}
                          >
                            {index + 1}. {item.title}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        )}

        
        {/* Project Info */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Main Content */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2 }}>
              <TabbedDescriptions 
                descriptions={project.descriptions || []} 
                isDark={isDark}
                project={project}
              />
            </Box>
          </Grid>

          
          
                  </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetail;