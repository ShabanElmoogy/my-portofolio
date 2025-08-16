import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const TestNavigation = () => {
  const navigate = useNavigate();

  const handleTestNavigation = () => {
    console.log('Test navigation clicked');
    navigate('/project/1');
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Navigation Test
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleTestNavigation}
        sx={{ mr: 2 }}
      >
        Test Navigate to Project 1
      </Button>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default TestNavigation;