import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { Box, Typography, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import GridHeader from './shared/GridHeader';
import BusinessTypeDialog from './BusinessTypeDialog';

const BusinessTypesView = ({ 
  businessTypes, 
  loading, 
  onCreateBusinessType, 
  onUpdateBusinessType, 
  onDeleteBusinessType 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBusinessType, setEditingBusinessType] = useState(null);

  const handleDialogOpen = (businessType = null) => {
    setEditingBusinessType(businessType);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingBusinessType(null);
  };

  const handleSubmit = async (businessTypeData) => {
    if (editingBusinessType) {
      return await onUpdateBusinessType(editingBusinessType.id, businessTypeData);
    } else {
      return await onCreateBusinessType(businessTypeData);
    }
  };

  // Custom footer component
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {businessTypes.length} business type{businessTypes.length !== 1 ? 's' : ''}
          </Typography>
          <GridFooter />
        </Box>
      </GridFooterContainer>
    );
  };

  const businessTypeColumns = [
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
        console.log('Rendering business type name cell:', params);
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
          onClick={() => onDeleteBusinessType(params.id)} 
        />
      ]
    }
  ];

  return (
    <Box>
      <GridHeader
        title="Business Types"
        onAdd={() => handleDialogOpen()}
        addButtonText="Add Business Type"
        addTooltip="Add New Business Type"
        icon={BusinessIcon}
      />

      <Paper elevation={1} sx={{ height: 380, width: '100%' }}>
        <DataGrid
          rows={businessTypes}
          columns={businessTypeColumns}
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

      <BusinessTypeDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        editingBusinessType={editingBusinessType}
        loading={loading}
        businessTypes={businessTypes}
      />
    </Box>
  );
};

export default BusinessTypesView;