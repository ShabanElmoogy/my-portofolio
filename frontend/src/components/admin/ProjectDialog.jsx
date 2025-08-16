import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  IconButton,
  Paper,
  Chip,
  Autocomplete,
  Stack,
  Divider,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const API_URL = "http://localhost:3000/projects";
const CATEGORIES_URL = "http://localhost:3000/categories";
const BUSINESS_TYPES_URL = "http://localhost:3000/business-types";
const TECHNOLOGIES_URL = "http://localhost:3000/technologies";

const ProjectDialog = ({ open, onClose, project = null, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    businessTypeId: '',
    categoryId: '',
    imgPath: '',
    images: [],
    githubUrl: '',
    previewUrl: '',
    featured: false,
    technologyIds: [],
    descriptions: [
      {
        title: 'Project Overview',
        points: [''],
        order: 0
      }
    ]
  });

  const [categories, setCategories] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        businessTypeId: project.businessTypeId || '',
        categoryId: project.categoryId || '',
        imgPath: project.imgPath || '',
        images: project.images || [],
        githubUrl: project.githubUrl || '',
        previewUrl: project.previewUrl || '',
        featured: project.featured || false,
        technologyIds: project.technologies?.map(tech => tech.id) || [],
        descriptions: project.descriptions && project.descriptions.length > 0 
          ? project.descriptions.map(desc => ({
              title: desc.title,
              points: desc.points,
              order: desc.order
            }))
          : [{ title: 'Project Overview', points: [''], order: 0 }]
      });
    } else {
      // Reset form for new project
      setFormData({
        title: '',
        businessTypeId: '',
        categoryId: '',
        imgPath: '',
        images: [],
        githubUrl: '',
        previewUrl: '',
        featured: false,
        technologyIds: [],
        descriptions: [
          {
            title: 'Project Overview',
            points: [''],
            order: 0
          }
        ]
      });
    }
    setErrors({});
  }, [project, open]);

  const fetchDropdownData = async () => {
    try {
      const [categoriesRes, businessTypesRes, technologiesRes] = await Promise.all([
        fetch(CATEGORIES_URL),
        fetch(BUSINESS_TYPES_URL),
        fetch(TECHNOLOGIES_URL)
      ]);

      const [categoriesData, businessTypesData, technologiesData] = await Promise.all([
        categoriesRes.json(),
        businessTypesRes.json(),
        technologiesRes.json()
      ]);

      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setBusinessTypes(Array.isArray(businessTypesData) ? businessTypesData : []);
      setTechnologies(Array.isArray(technologiesData) ? technologiesData : []);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleDescriptionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) => 
        i === index ? { ...desc, [field]: value } : desc
      )
    }));
  };

  const handlePointChange = (descIndex, pointIndex, value) => {
    setFormData(prev => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) => 
        i === descIndex 
          ? {
              ...desc,
              points: desc.points.map((point, j) => 
                j === pointIndex ? value : point
              )
            }
          : desc
      )
    }));
  };

  const addPoint = (descIndex) => {
    setFormData(prev => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) => 
        i === descIndex 
          ? { ...desc, points: [...desc.points, ''] }
          : desc
      )
    }));
  };

  const removePoint = (descIndex, pointIndex) => {
    setFormData(prev => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) => 
        i === descIndex 
          ? { ...desc, points: desc.points.filter((_, j) => j !== pointIndex) }
          : desc
      )
    }));
  };

  const addDescriptionSection = () => {
    setFormData(prev => ({
      ...prev,
      descriptions: [
        ...prev.descriptions,
        {
          title: '',
          points: [''],
          order: prev.descriptions.length
        }
      ]
    }));
  };

  const removeDescriptionSection = (index) => {
    if (formData.descriptions.length > 1) {
      setFormData(prev => ({
        ...prev,
        descriptions: prev.descriptions.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.imgPath.trim()) {
      newErrors.imgPath = 'Main image URL is required';
    }

    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = 'GitHub URL is required';
    }

    if (!formData.previewUrl.trim()) {
      newErrors.previewUrl = 'Preview URL is required';
    }

    // Validate descriptions
    formData.descriptions.forEach((desc, descIndex) => {
      if (!desc.title.trim()) {
        newErrors[`description_${descIndex}_title`] = 'Section title is required';
      }

      const validPoints = desc.points.filter(point => point.trim());
      if (validPoints.length === 0) {
        newErrors[`description_${descIndex}_points`] = 'At least one bullet point is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
  
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      // Clean up descriptions - remove empty points
      const cleanedDescriptions = formData.descriptions.map(desc => ({
        title: desc.title.trim(),
        points: desc.points.filter(point => point.trim()),
        order: desc.order
      }));

      const payload = {
        ...formData,
        descriptions: cleanedDescriptions,
        businessTypeId: formData.businessTypeId || null,
        categoryId: formData.categoryId || null
      };

      const url = project ? `${API_URL}/${project.id}` : API_URL;
      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      const savedProject = await response.json();
      console.log('Project saved successfully:', savedProject);
      
      // Call onSave with the saved project
      try {
        onSave(savedProject);
        console.log('onSave called successfully');
      } catch (onSaveError) {
        console.error('Error calling onSave:', onSaveError);
        setErrors({ submit: 'Error updating project list: ' + onSaveError.message });
        return;
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {project ? 'Edit Project' : 'Add New Project'}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.submit}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Basic Information
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Project Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Business Type</InputLabel>
              <Select
                value={formData.businessTypeId}
                onChange={(e) => handleInputChange('businessTypeId', e.target.value)}
                label="Business Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {businessTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* URLs */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
              URLs & Media
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Main Image URL"
              value={formData.imgPath}
              onChange={(e) => handleInputChange('imgPath', e.target.value)}
              error={!!errors.imgPath}
              helperText={errors.imgPath}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="GitHub URL"
              value={formData.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              error={!!errors.githubUrl}
              helperText={errors.githubUrl}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Preview URL"
              value={formData.previewUrl}
              onChange={(e) => handleInputChange('previewUrl', e.target.value)}
              error={!!errors.previewUrl}
              helperText={errors.previewUrl}
              required
            />
          </Grid>

          {/* Technologies */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
              Technologies & Settings
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Autocomplete
              multiple
              options={technologies}
              getOptionLabel={(option) => option.name}
              value={technologies.filter(tech => formData.technologyIds.includes(tech.id))}
              onChange={(event, newValue) => {
                handleInputChange('technologyIds', newValue.map(tech => tech.id));
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Technologies"
                  placeholder="Select technologies"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                />
              }
              label="Featured Project"
            />
          </Grid>

          {/* Descriptions */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
              Project Descriptions
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Add multiple sections to describe your project. Each section should have a title and bullet points.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            {formData.descriptions.map((description, descIndex) => (
              <Paper
                key={descIndex}
                elevation={2}
                sx={{ p: 3, mb: 3, borderRadius: 2 }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Section {descIndex + 1}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" color="primary">
                      <DragHandleIcon />
                    </IconButton>
                    {formData.descriptions.length > 1 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeDescriptionSection(descIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Stack>
                </Stack>

                <TextField
                  fullWidth
                  label="Section Title"
                  value={description.title}
                  onChange={(e) => handleDescriptionChange(descIndex, 'title', e.target.value)}
                  error={!!errors[`description_${descIndex}_title`]}
                  helperText={errors[`description_${descIndex}_title`]}
                  sx={{ mb: 2 }}
                  placeholder="e.g., Key Features, Technical Highlights, Project Overview"
                  required
                />

                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Bullet Points
                </Typography>

                {description.points.map((point, pointIndex) => (
                  <Stack key={pointIndex} direction="row" spacing={1} sx={{ mb: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={point}
                      onChange={(e) => handlePointChange(descIndex, pointIndex, e.target.value)}
                      placeholder="Enter a bullet point..."
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>•</Typography>
                      }}
                    />
                    {description.points.length > 1 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removePoint(descIndex, pointIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Stack>
                ))}

                {errors[`description_${descIndex}_points`] && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors[`description_${descIndex}_points`]}
                  </Typography>
                )}

                <Button
                  startIcon={<AddIcon />}
                  onClick={() => addPoint(descIndex)}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Add Bullet Point
                </Button>
              </Paper>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={addDescriptionSection}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Description Section
            </Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          startIcon={<CancelIcon />}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={loading}
        >
          {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;