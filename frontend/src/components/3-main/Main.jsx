import { useState, useEffect } from "react";
import "./Main.css";
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
  Pagination,
  Stack,
  Paper,
  Skeleton,
  Tooltip,
  Autocomplete,
  TextField,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from "@mui/material";
import {
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import ProjectDialog from "../admin/ProjectDialog";

const API_URL = "http://localhost:3000/projects";
const CATEGORIES_URL = "http://localhost:3000/categories";
const BUSINESS_TYPES_URL = "http://localhost:3000/business-types";
const TECHNOLOGIES_URL = "http://localhost:3000/technologies";

const Main = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [categories, setCategories] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [error, setError] = useState(null);

  // State for separate filters
  const [selectedBusinessType, setSelectedBusinessType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTechnology, setSelectedTechnology] = useState("all");

  // Project management functions
  const handleProjectSaved = (savedProject) => {
    console.log('handleProjectSaved called with:', savedProject);
    if (selectedProject) {
      // Update existing project
      setArr(prev => prev.map(p => p.id === savedProject.id ? savedProject : p));
    } else {
      // Add new project
      setArr(prev => [savedProject, ...prev]);
    }
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDeleteProject = (project, event) => {
    event.preventDefault();
    event.stopPropagation();
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const response = await fetch(`${API_URL}/${projectToDelete.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setArr(prev => prev.filter(p => p.id !== projectToDelete.id));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project. Please try again.');
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchProjects();
    fetchCategories();
    fetchBusinessTypes();
    fetchTechnologies();
  }, []);

  const fetchProjects = async (params = {}) => {
    setLoading(true);
    let url = API_URL;
    const query = new URLSearchParams(params).toString();
    if (query) url += `?${query}`;
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched projects:", data);
      setArr(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setArr([]);
      setError("Failed to load projects. Please try again.");
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORIES_URL, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    }
  };

  const fetchBusinessTypes = async () => {
    try {
      const res = await fetch(BUSINESS_TYPES_URL, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setBusinessTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch business types:", err);
      setBusinessTypes([]);
    }
  };

  const fetchTechnologies = async () => {
    try {
      const res = await fetch(TECHNOLOGIES_URL, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTechnologies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch technologies:", err);
      setTechnologies([]);
    }
  };

  // Handle category filter
  const handleBusinessTypeFilter = (businessTypeValue) => {
    setSelectedBusinessType(businessTypeValue);
    setCurrentPage(1);
    applyFilters(businessTypeValue, selectedCategory, selectedTechnology);
  };

  const handleCategoryFilter = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setCurrentPage(1);
    applyFilters(selectedBusinessType, categoryValue, selectedTechnology);
  };

  // Handle technology filter
  const handleTechnologyFilter = (technologyValue) => {
    setSelectedTechnology(technologyValue);
    setCurrentPage(1);
    applyFilters(selectedBusinessType, selectedCategory, technologyValue);
  };

  // Apply combined filters
  const applyFilters = async (businessType, category, technology) => {
    setLoading(true);

    try {
      let url = API_URL;

      // If both filters are "all", get all projects
      if (businessType === "all" && category === "all" && technology === "all") {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setArr(Array.isArray(data) ? data : []);
        setLoading(false);
        return;
      }

      // Get all projects first
      const allProjectsRes = await fetch(url);
      if (!allProjectsRes.ok) {
        throw new Error(`HTTP error! status: ${allProjectsRes.status}`);
      }
      const allProjects = await allProjectsRes.json();

      // Filter on frontend based on selected filters
      let filteredProjects = Array.isArray(allProjects) ? allProjects : [];

      if (businessType !== "all") {
        filteredProjects = filteredProjects.filter(project =>
          project.businessType?.name === businessType
        );
      }

      if (category !== "all") {
        filteredProjects = filteredProjects.filter(project =>
          project.category?.name === category
        );
      }

      if (technology !== "all") {
        filteredProjects = filteredProjects.filter(project =>
          project.technologies?.some(tech => tech.name === technology)
        );
      }

      setArr(filteredProjects);
    } catch (err) {
      console.error("Error filtering projects:", err);
      setArr([]);
    }

    setLoading(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBusinessType("all");
    setSelectedCategory("all");
    setSelectedTechnology("all");
    setCurrentPage(1);
    fetchProjects();
  };

  // Calculate pagination - ensure arr is always an array
  const safeArr = Array.isArray(arr) ? arr : [];
  const totalPages = Math.ceil(safeArr.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = safeArr.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleOpenUrl = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Helper function to get description text
  const getProjectDescription = (item) => {
    if (item.descriptions && Array.isArray(item.descriptions) && item.descriptions.length > 0) {
      const firstDesc = item.descriptions[0];
      if (firstDesc.points && Array.isArray(firstDesc.points) && firstDesc.points.length > 0) {
        return firstDesc.points[0];
      }
    }
    return "A modern web application built with cutting-edge technologies.";
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, position: 'relative' }}>
      
      
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Admin Mode Indicator */}
      {adminMode && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Admin Mode Active:</strong> You can now add, edit, and delete projects. Click on the edit or delete icons on project cards.
        </Alert>
      )}

      {/* Compact Filter System */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
            : 'linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0.02) 100%)',
          backdropFilter: 'blur(10px)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(33,150,243,0.1)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.2)'
            : '0 8px 32px rgba(33,150,243,0.1)'
        }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Filter Projects
          </Typography>
        </Stack>

        {/* Active Filters */}
        {(selectedBusinessType !== "all" || selectedCategory !== "all" || selectedTechnology !== "all") && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Active:
              </Typography>
              {selectedBusinessType !== "all" && (
                <Chip
                  label={selectedBusinessType}
                  onDelete={() => handleBusinessTypeFilter("all")}
                  color="info"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              )}
              {selectedCategory !== "all" && (
                <Chip
                  label={selectedCategory}
                  onDelete={() => handleCategoryFilter("all")}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              )}
              {selectedTechnology !== "all" && (
                <Chip
                  label={selectedTechnology}
                  onDelete={() => handleTechnologyFilter("all")}
                  color="secondary"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              )}
              <Button
                size="small"
                onClick={clearAllFilters}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  minWidth: 'auto'
                }}
              >
                Clear All
              </Button>
            </Stack>
          </Box>
        )}

        {/* Filters Grid */}
        <Grid container spacing={3} alignItems="center">
          {/* Business Types Autocomplete */}
         <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              value={selectedBusinessType === "all" ? null : { name: selectedBusinessType }}
              onChange={(event, newValue) => {
                handleBusinessTypeFilter(newValue ? newValue.name : "all");
              }}
              options={[...businessTypes]}
              getOptionLabel={(option) => option.name || ""}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'info.main'
                      }}
                    />
                    {option.name}
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Business Types"
                  placeholder="Type to search business types..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'info.main',
                        borderWidth: 2
                      },
                      '&:hover fieldset': {
                        borderColor: 'info.main'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'info.main'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'info.main',
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: 'info.main'
                      }
                    }
                  }}
                />
              )}
              sx={{ width: '100%' }}
              clearOnEscape
              clearText="Clear"
              noOptionsText="No business types found"
            />
          </Grid>

          {/* Categories Autocomplete */}
         <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              value={selectedCategory === "all" ? null : { name: selectedCategory }}
              onChange={(event, newValue) => {
                handleCategoryFilter(newValue ? newValue.name : "all");
              }}
              options={[...categories]}
              getOptionLabel={(option) => option.name || ""}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main'
                      }}
                    />
                    {option.name}
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Categories"
                  placeholder="Type to search categories..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'primary.main',
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: 'primary.main'
                      }
                    }
                  }}
                />
              )}
              sx={{ width: '100%' }}
              clearOnEscape
              clearText="Clear"
              noOptionsText="No categories found"
            />
          </Grid>

          {/* Technologies Autocomplete */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              value={selectedTechnology === "all" ? null : { name: selectedTechnology }}
              onChange={(event, newValue) => {
                handleTechnologyFilter(newValue ? newValue.name : "all");
              }}
              options={[...technologies]}
              getOptionLabel={(option) => option.name || ""}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'secondary.main'
                      }}
                    />
                    {option.name}
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Technologies"
                  placeholder="Type to search technologies..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'secondary.main',
                        borderWidth: 2
                      },
                      '&:hover fieldset': {
                        borderColor: 'secondary.main'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'secondary.main'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'secondary.main',
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: 'secondary.main'
                      }
                    }
                  }}
                />
              )}
              sx={{ width: '100%' }}
              clearOnEscape
              clearText="Clear"
              noOptionsText="No technologies found"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Projects Grid - Two Rows */}
      <Box>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card sx={{ borderRadius: 3 }}>
                  <Skeleton variant="rectangular" height={240} />
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
        ) : (
          <AnimatePresence>
            <Grid container spacing={3}>
              {currentItems.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{
                      duration: 0.4,
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
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'background.paper',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: isDark
                            ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(33,150,243,0.1)'
                            : '0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(33,150,243,0.1)',
                        },
                        '&:hover .card-overlay': {
                          opacity: 1,
                        },
                        '&:hover .admin-overlay': {
                          opacity: adminMode ? 1 : 0,
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height="240"
                          image={item.imgPath}
                          alt={item.title}
                          sx={{
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        
                        {/* Regular Overlay (Preview/GitHub) */}
                        <Box
                          className="card-overlay"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            zIndex: adminMode ? 1 : 2
                          }}
                        >
                          {item.previewUrl && (
                            <Tooltip title="View Live Demo">
                              <IconButton
                                size="large"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleOpenUrl(item.previewUrl);
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
                          {item.githubUrl && (
                            <Tooltip title="View Source Code">
                              <IconButton
                                size="large"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleOpenUrl(item.githubUrl);
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

                        {/* Admin Overlay (Edit/Delete) */}
                        {adminMode && (
                          <Box
                            className="admin-overlay"
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.8) 0%, rgba(123, 31, 162, 0.6) 100%)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 2,
                              zIndex: 2
                            }}
                          >
                            <Tooltip title="Edit Project">
                              <IconButton
                                size="large"
                                onClick={(e) => handleEditProject(item, e)}
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
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Project">
                              <IconButton
                                size="large"
                                onClick={(e) => handleDeleteProject(item, e)}
                                sx={{
                                  color: 'white',
                                  backgroundColor: 'rgba(244, 67, 54, 0.8)',
                                  backdropFilter: 'blur(10px)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 1)',
                                    transform: 'scale(1.1)'
                                  }
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )}

                        {item.featured && (
                          <Chip
                            label="Featured"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              fontWeight: 'bold',
                              backgroundColor: '#ffa000',
                              color: 'white',
                              zIndex: 3
                            }}
                          />
                        )}
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
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, lineHeight: 1.6 }}
                        >
                          {getProjectDescription(item)}
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {item.technologies && item.technologies.length > 0 ? (
                            item.technologies.slice(0, 3).map((tech, techIndex) => (
                              <Chip
                                key={techIndex}
                                label={tech.name || tech}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: 'primary.main',
                                  color: 'primary.main',
                                  '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white'
                                  }
                                }}
                              />
                            ))
                          ) : (
                            item.technology && (
                              <Chip
                                label={item.technology}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: 'primary.main',
                                  color: 'primary.main'
                                }}
                              />
                            )
                          )}
                          {item.technologies && item.technologies.length > 3 && (
                            <Chip
                              label={`+${item.technologies.length - 3} more`}
                              size="small"
                              variant="outlined"
                              color="secondary"
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
                            console.log('Navigating to project:', item.id);
                            navigate(`/project/${item.id}`);
                          }}
                          sx={{
                            borderRadius: 2,
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
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        )}
      </Box>

      {/* Project Dialog */}
      <ProjectDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSave={handleProjectSaved}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Main;