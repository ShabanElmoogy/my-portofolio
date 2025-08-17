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
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Tab as TabIcon
} from '@mui/icons-material';

const API_URL = "http://localhost:3000/projects";
const CATEGORIES_URL = "http://localhost:3000/categories";
const BUSINESS_TYPES_URL = "http://localhost:3000/business-types";
const TECHNOLOGIES_URL = "http://localhost:3000/technologies";

// Predefined description categories for tabs
const DESCRIPTION_CATEGORIES = [
  'Overview',
  'Features', 
  'Technical',
  'Implementation',
  'Design',
  'Performance'
];

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
        category: 'Overview',
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
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        businessTypeId: project.businessType?.id || '',
        categoryId: project.category?.id || '',
        imgPath: project.imgPath || '',
        images: project.images || [],
        githubUrl: project.githubUrl || '',
        previewUrl: project.previewUrl || '',
        featured: project.featured || false,
        technologyIds: project.technologies?.map(tech => tech.id) || [],
        descriptions: project.descriptions && project.descriptions.length > 0 
          ? project.descriptions.map(desc => ({
              category: desc.category || 'Overview',
              title: desc.title,
              points: desc.points,
              order: desc.order
            }))
          : [{ category: 'Overview', title: 'Project Overview', points: [''], order: 0 }]
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
            category: 'Overview',
            title: 'Project Overview',
            points: [''],
            order: 0
          }
        ]
      });
    }
    setErrors({});
    setActiveTab(0);
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

  // Gallery images handlers
  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { imageUrl: '', altText: '' }]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? { ...img, [field]: value } : img)
    }));
    if (errors[`image_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`image_${index}_${field}`]: null }));
    }
  };

  const addDescriptionSection = (category) => {
    setFormData(prev => ({
      ...prev,
      descriptions: [
        ...prev.descriptions,
        {
          category: category,
          title: '',
          points: [''],
          order: prev.descriptions.filter(d => d.category === category).length
        }
      ]
    }));
  };

  const removeDescriptionSection = (index) => {
    const categoryDescriptions = getDescriptionsByCategory(formData.descriptions[index].category);
    if (categoryDescriptions.length > 1) {
      setFormData(prev => ({
        ...prev,
        descriptions: prev.descriptions.filter((_, i) => i !== index)
      }));
    }
  };

  // Group descriptions by category
  const getDescriptionsByCategory = (category) => {
    return formData.descriptions.filter(desc => desc.category === category);
  };

  // Get all categories that have descriptions
  const getUsedCategories = () => {
    const used = [...new Set(formData.descriptions.map(desc => desc.category))];
    return DESCRIPTION_CATEGORIES.filter(cat => used.includes(cat));
  };

  const validateForm = () => {
    console.log('🔍 Starting form validation...');
    console.log('📋 Form data:', formData);
    
    const newErrors = {};

    // Basic field validation
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'Title is required';
      console.log('❌ Title validation failed');
    }

    if (!formData.imgPath || !formData.imgPath.trim()) {
      newErrors.imgPath = 'Main image URL is required';
      console.log('❌ Image path validation failed');
    }

    if (!formData.githubUrl || !formData.githubUrl.trim()) {
      newErrors.githubUrl = 'GitHub URL is required';
      console.log('❌ GitHub URL validation failed');
    }

    if (!formData.previewUrl || !formData.previewUrl.trim()) {
      newErrors.previewUrl = 'Preview URL is required';
      console.log('❌ Preview URL validation failed');
    }

    // Validate descriptions - only validate sections that have meaningful content
    console.log('🔍 Validating descriptions:', formData.descriptions);
    
    // Filter descriptions that have both title and at least one valid point
    const validDescriptions = formData.descriptions.filter(desc => {
      const hasTitle = desc.title && desc.title.trim();
      const hasValidPoints = desc.points && desc.points.some(point => point && point.trim());
      return hasTitle && hasValidPoints;
    });
    
    console.log('🔍 Valid descriptions found:', validDescriptions);
    
    // Check if we have at least one complete description
    if (validDescriptions.length === 0) {
      newErrors.descriptions = 'At least one complete description section is required (with title and bullet points)';
      console.log('❌ No complete descriptions found');
    }

    // Validate gallery images: Image URL required if a row exists
    if (Array.isArray(formData.images)) {
      formData.images.forEach((img, idx) => {
        const url = (img?.imageUrl || '').trim();
        const alt = (img?.altText || '').trim();
        if (!url && (alt || img)) {
          newErrors[`image_${idx}_imageUrl`] = 'Image URL is required for gallery images';
        }
      });
    }

    console.log('🔍 Validation errors found:', newErrors);
    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0;
    console.log(`✅ Form validation result: ${isValid ? 'PASSED' : 'FAILED'}`);
    
    return isValid;
  };

  const handleSave = async () => {
    console.log('🚀 handleSave called');
    console.log('📋 Current formData:', formData);
    
    try {
      if (!validateForm()) {
        console.log('❌ Validation failed, stopping save process');
        return;
      }
      
      console.log('✅ Validation passed, proceeding with save');
      setLoading(true);
      
      // Clean up descriptions - ensure every description has valid points
      const cleanedDescriptions = formData.descriptions
        .map(desc => {
          // Filter out empty points
          const validPoints = desc.points ? desc.points.filter(point => point && point.trim()) : [];
          
          // If no valid points, add a default one
          if (validPoints.length === 0) {
            validPoints.push('Key feature or detail about this project');
          }
          
          return {
            category: desc.category || 'Overview',
            title: desc.title || 'Project Details',
            points: validPoints,
            order: desc.order || 0
          };
        })
        .filter(desc => desc.title && desc.title.trim()); // Only keep descriptions with titles

      // Ensure we have at least one description
      if (cleanedDescriptions.length === 0) {
        cleanedDescriptions.push({
          category: 'Overview',
          title: 'Project Overview',
          points: ['This is an innovative project showcasing modern development practices'],
          order: 0
        });
      }

      console.log('🧹 Cleaned descriptions:', cleanedDescriptions);

      // Clean up images - remove entries without a valid URL and ensure order
      const cleanedImages = (formData.images || [])
        .filter(img => img && img.imageUrl && img.imageUrl.trim())
        .map((img, idx) => ({
          imageUrl: img.imageUrl.trim(),
          altText: (img.altText || '').trim(),
          order: typeof img.order === 'number' ? img.order : idx
        }));

      const payload = {
        ...formData,
        descriptions: cleanedDescriptions,
        images: cleanedImages,
        businessTypeId: formData.businessTypeId || null,
        categoryId: formData.categoryId || null
      };

      console.log('📤 Sending payload:', payload);

      const url = project ? `${API_URL}/${project.id}` : API_URL;
      const method = project ? 'PUT' : 'POST';

      console.log(`🌐 Making ${method} request to ${url}`);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Server error:', errorData);
        throw new Error(errorData.error || 'Failed to save project');
      }

      const savedProject = await response.json();
      console.log('✅ Project saved successfully:', savedProject);
      
      // Call onSave with the saved project
      try {
        onSave(savedProject);
        console.log('✅ onSave called successfully');
      } catch (onSaveError) {
        console.error('❌ Error calling onSave:', onSaveError);
        setErrors({ submit: 'Error updating project list: ' + onSaveError.message });
        return;
      }
      
      onClose();
    } catch (error) {
      console.error('❌ Error saving project:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const usedCategories = getUsedCategories();
  const currentCategory = usedCategories[activeTab] || 'Overview';
  const currentCategoryDescriptions = getDescriptionsByCategory(currentCategory);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '85vh' }
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

        {errors.descriptions && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.descriptions}
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

          {/* Gallery Images */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Gallery Images
                  </Typography>
                  <Button startIcon={<AddIcon />} size="small" onClick={addImage}>
                    Add Image
                  </Button>
                </Stack>

                {formData.images.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No gallery images added. Use "Add Image" to include more images in the gallery.
                  </Typography>
                )}

                {formData.images.map((img, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField
                          fullWidth
                          label="Image URL"
                          value={img.imageUrl || ''}
                          onChange={(e) => handleImageChange(index, 'imageUrl', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          error={!!errors[`image_${index}_imageUrl`]}
                          helperText={errors[`image_${index}_imageUrl`]}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Alt Text"
                          value={img.altText || ''}
                          onChange={(e) => handleImageChange(index, 'altText', e.target.value)}
                          placeholder="Short description"
                        />
                      </Grid>
                    </Grid>
                    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                      <IconButton color="error" onClick={() => removeImage(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>
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

          {/* Descriptions with Tabs */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
              Project Descriptions
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Organize your project descriptions into categories. Each category can have multiple sections.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {/* Category Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {usedCategories.map((category, index) => (
                    <Tab 
                      key={category} 
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TabIcon fontSize="small" />
                          <span>{category}</span>
                          <Chip 
                            label={getDescriptionsByCategory(category).length} 
                            size="small" 
                            color="primary"
                            sx={{ minWidth: 20, height: 20 }}
                          />
                        </Stack>
                      }
                    />
                  ))}
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 3 }}>
                {/* Add New Category */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Add New Category
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {DESCRIPTION_CATEGORIES.filter(cat => !usedCategories.includes(cat)).map(category => (
                      <Button
                        key={category}
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => {
                          addDescriptionSection(category);
                          setActiveTab(usedCategories.length); // Switch to new tab
                        }}
                      >
                        {category}
                      </Button>
                    ))}
                  </Stack>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Current Category Sections */}
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {currentCategory} Sections
                </Typography>

                {currentCategoryDescriptions.map((description, localIndex) => {
                  const globalIndex = formData.descriptions.findIndex(d => d === description);
                  return (
                    <Paper
                      key={globalIndex}
                      elevation={1}
                      sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {currentCategory} Section {localIndex + 1}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small" color="primary">
                            <DragHandleIcon />
                          </IconButton>
                          {currentCategoryDescriptions.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeDescriptionSection(globalIndex)}
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
                        onChange={(e) => handleDescriptionChange(globalIndex, 'title', e.target.value)}
                        error={!!errors[`description_${globalIndex}_title`]}
                        helperText={errors[`description_${globalIndex}_title`]}
                        sx={{ mb: 2 }}
                        placeholder={`e.g., ${currentCategory} Details, Key ${currentCategory} Points`}
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
                            onChange={(e) => handlePointChange(globalIndex, pointIndex, e.target.value)}
                            placeholder="Enter a bullet point..."
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>•</Typography>
                            }}
                          />
                          {description.points.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removePoint(globalIndex, pointIndex)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Stack>
                      ))}

                      {errors[`description_${globalIndex}_points`] && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                          {errors[`description_${globalIndex}_points`]}
                        </Typography>
                      )}

                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => addPoint(globalIndex)}
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Add Bullet Point
                      </Button>
                    </Paper>
                  );
                })}

                {/* Add Section to Current Category */}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => addDescriptionSection(currentCategory)}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add Section to {currentCategory}
                </Button>
              </Box>
            </Paper>
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