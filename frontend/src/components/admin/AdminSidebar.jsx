import { Drawer, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';

const AdminSidebar = ({ view, setView }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box', 
          pt: 8,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton 
            selected={view === 'projects'} 
            onClick={() => setView('projects')}
            sx={{ 
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          >
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText 
              primary="Projects" 
              primaryTypographyProps={{ 
                fontWeight: view === 'projects' ? 600 : 400 
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={view === 'categories'} 
            onClick={() => setView('categories')}
            sx={{ 
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          >
            <CategoryIcon sx={{ mr: 2 }} />
            <ListItemText 
              primary="Categories" 
              primaryTypographyProps={{ 
                fontWeight: view === 'categories' ? 600 : 400 
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={view === 'businessTypes'} 
            onClick={() => setView('businessTypes')}
            sx={{ 
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          >
            <BusinessIcon sx={{ mr: 2 }} />
            <ListItemText 
              primary="Business Types" 
              primaryTypographyProps={{ 
                fontWeight: view === 'businessTypes' ? 600 : 400 
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={view === 'technologies'} 
            onClick={() => setView('technologies')}
            sx={{ 
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          >
            <CodeIcon sx={{ mr: 2 }} />
            <ListItemText 
              primary="Technologies" 
              primaryTypographyProps={{ 
                fontWeight: view === 'technologies' ? 600 : 400 
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;