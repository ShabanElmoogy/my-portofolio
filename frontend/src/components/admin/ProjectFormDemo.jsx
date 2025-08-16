import { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ProjectDialog from './ProjectDialog';

const ProjectFormDemo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProjectSaved = (project) => {
    console.log('Project saved:', project);
    alert(`Project "${project.title}" saved successfully!`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Project Form Demo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Test the new project creation form with multiple description sections
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        onClick={() => setDialogOpen(true)}
      >
        Open Project Form
      </Button>

      <ProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleProjectSaved}
      />

      <Box sx={{ mt: 4, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Features:
        </Typography>
        <Typography variant="body2" component="div" sx={{ textAlign: 'left' }}>
          • Multiple description sections with custom titles<br/>
          • Dynamic bullet points (add/remove)<br/>
          • Technology selection with autocomplete<br/>
          • Business type and category dropdowns<br/>
          • Form validation for required fields<br/>
          • Featured project toggle<br/>
          • Image and URL inputs
        </Typography>
      </Box>
    </Container>
  );
};

export default ProjectFormDemo;