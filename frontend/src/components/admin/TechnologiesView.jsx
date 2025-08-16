/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { Box, Typography, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GridHeader from './shared/GridHeader';
import TechnologyDialog from './TechnologyDialog';

const TechnologiesView = ({ 
  technologies, 
  loading, 
  onCreateTechnology, 
  onUpdateTechnology, 
  onDeleteTechnology 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState(null);

  const handleDialogOpen = (technology = null) => {
    setEditingTechnology(technology);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingTechnology(null);
  };

  const handleSubmit = async (technologyData) => {
    if (editingTechnology) {
      return await onUpdateTechnology(editingTechnology.id, technologyData);
    } else {
      return await onCreateTechnology(technologyData);
    }
  };

  // Custom footer component
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {technologies.length} technolog{technologies.length !== 1 ? 'ies' : 'y'}
          </Typography>
          <GridFooter />
        </Box>
      </GridFooterContainer>
    );
  };

  const technologyColumns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70,
      type: 'number'
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      type: 'string',
      renderCell: (params) => {
        console.log('Rendering technology name cell:', params);
        return String(params.value || '');
      }
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
          onClick={() => onDeleteTechnology(params.id)} 
        />
      ]
    }
  ];

  return (
    <Box>
      <GridHeader
        title="Technologies"
        onAdd={() => handleDialogOpen()}
        addButtonText="Add Technology"
        addTooltip="Add New Technology"
        icon={CodeIcon}
      />

      <Paper elevation={1} sx={{ height: 390, width: '100%' }}>
        <DataGrid
          rows={technologies}
          columns={technologyColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          slots={{
            footer: CustomFooter,
          }}
        />
      </Paper>

      <TechnologyDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        editingTechnology={editingTechnology}
        loading={loading}
        technologies={technologies}
      />
    </Box>
  );
};

export default TechnologiesView;