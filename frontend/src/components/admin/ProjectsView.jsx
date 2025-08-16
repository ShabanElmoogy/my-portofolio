/* eslint-disable react/prop-types */
import { useState, forwardRef } from "react";
import { DataGrid, GridActionsCellItem, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { 
  Box, 
  Chip, 
  Paper, 
  Typography, 
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Stack,
  Slide,
  IconButton,
  useTheme
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import GridHeader from './shared/GridHeader';
import ProjectDialog from './ProjectDialog';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectsView = ({ 
  projects, 
  categories, 
  businessTypes,
  technologies,
  loading, 
  onCreateProject, 
  onUpdateProject, 
  onDeleteProject,
  onRefreshProjects
}) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to get color for technology chip
  const getTechnologyColor = (techName) => {
    const colors = [
      { bg: '#e3f2fd', color: '#1976d2', border: '#bbdefb' }, // Blue
      { bg: '#f3e5f5', color: '#7b1fa2', border: '#ce93d8' }, // Purple
      { bg: '#e8f5e8', color: '#388e3c', border: '#a5d6a7' }, // Green
      { bg: '#fff3e0', color: '#f57c00', border: '#ffcc02' }, // Orange
      { bg: '#fce4ec', color: '#c2185b', border: '#f8bbd9' }, // Pink
      { bg: '#e0f2f1', color: '#00796b', border: '#80cbc4' }, // Teal
      { bg: '#f1f8e9', color: '#689f38', border: '#aed581' }, // Light Green
      { bg: '#fff8e1', color: '#ffa000', border: '#ffcc02' }, // Amber
      { bg: '#e8eaf6', color: '#3f51b5', border: '#9fa8da' }, // Indigo
      { bg: '#efebe9', color: '#5d4037', border: '#a1887f' }, // Brown
      { bg: '#fafafa', color: '#424242', border: '#bdbdbd' }, // Grey
      { bg: '#e0f7fa', color: '#00acc1', border: '#4dd0e1' }, // Cyan
    ];
    
    // Generate a consistent index based on technology name
    let hash = 0;
    for (let i = 0; i < techName.length; i++) {
      hash = techName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const handleDialogOpen = (project = null) => {
    setEditingProject(project);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingProject(null);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
    setIsDeleting(false);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    
    setIsDeleting(true);
    try {
      const result = await onDeleteProject(projectToDelete.id);
      if (result && result.success) {
        // Refresh the project list
        if (onRefreshProjects) {
          await onRefreshProjects();
        }
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleSubmit = async (data) => {
    // Check if data is already a saved project (has id) or form data
    if (data.id) {
      // This is already a saved project from ProjectDialog
      // Refresh the project list to show the updated data
      if (onRefreshProjects) {
        await onRefreshProjects();
      }
      return { success: true };
    } else {
      // This is form data, make API call
      if (editingProject) {
        return await onUpdateProject(editingProject.id, data);
      } else {
        return await onCreateProject(data);
      }
    }
  };

  // Custom footer component
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {projects.length} project{projects.length !== 1 ? 's' : ''}
          </Typography>
          <GridFooter />
        </Box>
      </GridFooterContainer>
    );
  };

  const projectColumns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70,
      type: 'number'
    },
    { 
      field: 'title', 
      headerName: 'Title', 
      flex: 1,
      type: 'string'
    },
    {
      field: 'businessType',
      headerName: 'Business Type',
      flex: 1,
      type: 'string',
      renderCell: (params) => {
        return params.row.businessType?.name || 'No Business Type';
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      type: 'string',
      renderCell: (params) => {
        return params.row.category?.name || 'No Category';
      },
    },
    {
      field: 'featured',
      headerName: 'Featured',
      width: 100,
      type: 'boolean',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {params.row.featured ? (
            <StarIcon sx={{ color: '#ffa000', fontSize: 20 }} />
          ) : (
            <StarOutlineIcon sx={{ color: '#ccc', fontSize: 20 }} />
          )}
        </Box>
      ),
    },
    {
      field: 'technologies',
      headerName: 'Technologies',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 0.5, 
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          py: 1
        }}>
          {params.row.technologies?.map((tech) => {
            const colors = getTechnologyColor(tech.name);
            return (
              <Chip 
                key={tech.id} 
                label={tech.name} 
                size="small" 
                variant="filled"
                sx={{ 
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  bgcolor: colors.bg,
                  color: colors.color,
                  border: `1px solid ${colors.border}`,
                  '&:hover': {
                    bgcolor: colors.border,
                  },
                  borderRadius: '12px',
                  height: '24px'
                }}
              />
            );
          })}
        </Box>
      )
    },
    {
      field: 'imgPath',
      headerName: 'Image',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="" 
          style={{ 
            width: 80, 
            height: 50, 
            objectFit: 'cover', 
            borderRadius: 4 
          }} 
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem 
          key={`edit-${params.id}`} 
          label="Edit" 
          showInMenu 
          onClick={() => handleDialogOpen(params.row)} 
        />,
        <GridActionsCellItem 
          key={`delete-${params.id}`} 
          label="Delete" 
          showInMenu 
          onClick={() => handleDeleteClick(params.row)} 
        />
      ]
    }
  ];

  return (
    <Box>
      <GridHeader
        title="Projects"
        onAdd={() => handleDialogOpen()}
        addButtonText="Add Project"
        addTooltip="Add New Project"
        icon={DashboardIcon}
      />

      <Paper elevation={1} sx={{ height: 390, width: '100%' }}>
        <DataGrid
          rows={projects}
          columns={projectColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          loading={loading}
          disableRowSelectionOnClick
          slots={{
            footer: CustomFooter,
          }}
        />
      </Paper>

      <ProjectDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSubmit}
        project={editingProject}
        categories={categories}
        businessTypes={businessTypes}
        technologies={technologies}
        loading={loading}
      />

      {/* Compact Themed Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
            backgroundImage: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 20px 40px rgba(0,0,0,0.3)'
              : '0 20px 40px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogContent sx={{ p: 3, textAlign: 'center' }}>
          {/* Close button */}
          <IconButton
            onClick={handleDeleteCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.text.secondary,
              '&:hover': {
                bgcolor: theme.palette.action.hover
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Warning Icon */}
          <Avatar sx={{ 
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(244, 67, 54, 0.2)' 
              : 'rgba(244, 67, 54, 0.1)',
            width: 64, 
            height: 64,
            mx: 'auto',
            mb: 2,
            border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.2)'}`
          }}>
            <WarningAmberIcon sx={{ 
              fontSize: 32, 
              color: theme.palette.error.main 
            }} />
          </Avatar>

          {/* Title */}
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            mb: 1,
            color: theme.palette.text.primary
          }}>
            Delete Project?
          </Typography>

          {/* Project name */}
          {projectToDelete && (
            <Typography variant="body2" sx={{ 
              mb: 2,
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}>
              &quot;{projectToDelete.title}&quot;
            </Typography>
          )}

          {/* Warning message */}
          <Typography variant="body2" sx={{ 
            color: theme.palette.text.secondary,
            lineHeight: 1.5,
            mb: 3
          }}>
            This action cannot be undone. The project and all its data will be permanently deleted.
          </Typography>

          {/* Project preview */}
          {projectToDelete && (
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(244, 67, 54, 0.05)' 
                : 'rgba(244, 67, 54, 0.03)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(244, 67, 54, 0.1)'}`,
              mb: 3
            }}>
              <Box
                component="img"
                src={projectToDelete.imgPath}
                alt={projectToDelete.title}
                sx={{
                  width: 40,
                  height: 28,
                  objectFit: 'cover',
                  borderRadius: 1,
                  opacity: 0.7
                }}
              />
              <Stack spacing={0.5} alignItems="flex-start">
                <Typography variant="body2" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}>
                  {projectToDelete.title}
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  {projectToDelete.featured && (
                    <Chip 
                      icon={<StarIcon />}
                      label="Featured" 
                      size="small" 
                      sx={{ 
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: '#ffa000', 
                        color: 'white',
                        '& .MuiChip-icon': { 
                          color: 'white',
                          fontSize: '0.8rem'
                        }
                      }}
                    />
                  )}
                </Stack>
              </Stack>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            startIcon={<CancelIcon />}
            disabled={isDeleting}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: theme.palette.divider,
              color: theme.palette.text.secondary,
              '&:hover': {
                borderColor: theme.palette.text.secondary,
                bgcolor: theme.palette.action.hover
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            startIcon={isDeleting ? null : <DeleteIcon />}
            disabled={isDeleting}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: theme.palette.error.main,
              color: 'white',
              boxShadow: `0 4px 12px ${theme.palette.error.main}40`,
              '&:hover': {
                bgcolor: theme.palette.error.dark,
                boxShadow: `0 6px 16px ${theme.palette.error.main}50`,
                transform: 'translateY(-1px)'
              },
              '&:disabled': {
                bgcolor: theme.palette.error.light,
                color: 'white'
              }
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsView;