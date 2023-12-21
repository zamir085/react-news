import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NotFound: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Typography variant="h3" component="div">
        404 - Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;