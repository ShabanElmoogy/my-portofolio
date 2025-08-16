/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { Box, Chip, Paper, Typography, Icon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridHeader from './shared/GridHeader';
import ProjectDialog from './ProjectDialog';

const ProjectsView = ({ 
  projects, 
  categories, 
  businessTypes,
  technologies,
  loading, 
  onCreateProject, 
  onUpdateProject, 
  onDeleteProject 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  const handleSubmit = async (data) => {
    // Check if data is already a saved project (has id) or form data
    if (data.id) {
      // This is already a saved project from ProjectDialog, no need to make API call
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
          onClick={() => onDeleteProject(params.row.id)} 
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
    </Box>
  );
};

export default ProjectsView;