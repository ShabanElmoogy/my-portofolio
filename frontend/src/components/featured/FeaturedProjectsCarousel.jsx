import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import {
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip
} from "@mui/material";
import {
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon
} from "@mui/icons-material";
import { API_URL as API_BASE } from "../admin/utils/constants";

const FEATURED_PROJECTS_URL = `${API_BASE}/projects/featured`;

const FeaturedProjectsCarousel = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const handleOpenUrl = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Group projects for carousel (2 per slide on desktop, 1 on mobile)
  const groupProjects = (projects, itemsPerSlide) => {
    const grouped = [];
    for (let i = 0; i < projects.length; i += itemsPerSlide) {
      grouped.push(projects.slice(i, i + itemsPerSlide));
    }
    return grouped;
  };

  const itemsPerSlide = isMobile ? 1 : 2;
  const projectGroups = groupProjects(featuredProjects, itemsPerSlide);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Featured Projects
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Loading featured projects...
          </Typography>
        </Box>
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
            mb: 4,
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
          sx={{ textAlign: 'center' }}
        >
          No featured projects available at the moment
        </Typography>
      </Container>
    );
  }

  const ProjectCard = ({ project }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'background.paper',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 8px 32px rgba(0,0,0,0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark'
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
          height="220"
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
          {project.previewUrl && (
            <Tooltip title="View Live Demo">
              <IconButton
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenUrl(project.previewUrl);
                }}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(33, 150, 243, 0.8)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 1)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <LaunchIcon />
              </IconButton>
            </Tooltip>
          )}
          {project.githubUrl && (
            <Tooltip title="View Source Code">
              <IconButton
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenUrl(project.githubUrl);
                }}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          )}
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

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 1.5,
            lineHeight: 1.2,
            fontSize: '1.1rem'
          }}
        >
          {project.title}
        </Typography>

        {/* Business Type & Category */}
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
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

        {/* Technologies */}
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
          {project.technologies && project.technologies.length > 0 ? (
            project.technologies.slice(0, 3).map((tech, techIndex) => (
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
          {project.technologies && project.technologies.length > 3 && (
            <Chip
              label={`+${project.technologies.length - 3}`}
              size="small"
              variant="outlined"
              color="secondary"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          fullWidth
          size="small"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Navigating to project:', project.id);
            navigate(`/project/${project.id}`);
          }}
          sx={{
            borderRadius: 2,
            py: 1,
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
              : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                : 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 20px rgba(25, 118, 210, 0.4)'
                : '0 8px 20px rgba(33, 150, 243, 0.3)'
            }
          }}
        >
          View Project
        </Button>
      </CardActions>
    </Card>
  );

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

      {/* Carousel */}
      <Box sx={{ px: { xs: 0, md: 6 } }}>
        <Carousel
          animation="slide"
          duration={500}
          indicators={true}
          navButtonsAlwaysVisible={!isMobile}
          navButtonsProps={{
            style: {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              margin: '0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              zIndex: 10
            }
          }}
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          indicatorIconButtonProps={{
            style: {
              color: theme.palette.grey[400],
              margin: '0 5px'
            }
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: theme.palette.primary.main
            }
          }}
          sx={{
            '& .CarouselItem': {
              padding: '0 10px'
            },
            mx: { xs: 0, md: 4 }
          }}
        >
          {projectGroups.map((group, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: 4,
                  alignItems: 'stretch'
                }}
              >
                {group.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default FeaturedProjectsCarousel;