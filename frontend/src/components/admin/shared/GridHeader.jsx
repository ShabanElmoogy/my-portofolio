import { Card, CardContent, Box, Typography, Tooltip, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/Add';

const GridHeader = ({ 
  title, 
  onAdd, 
  addButtonText = "Add", 
  addTooltip = "Add new item",
  icon: Icon 
}) => {
  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 3,
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
        borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {Icon && (
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon />
              </Box>
            )}
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                color: (theme) => theme.palette.text.primary,
                mb: 0
              }}
            >
              {title}
            </Typography>
          </Box>
          <Tooltip title={addTooltip}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={onAdd}
              size="large"
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(25, 118, 210, 0.3)'
                  : '0 4px 12px rgba(25, 118, 210, 0.2)',
                '&:hover': {
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 6px 16px rgba(25, 118, 210, 0.4)'
                    : '0 6px 16px rgba(25, 118, 210, 0.3)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {addButtonText}
            </Button>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GridHeader;