import React from "react";
import { Box, Typography, TextField } from '@mui/material';

const TeamInput = ({ teamName, setTeamName }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Enter Team Name
      </Typography>
      <TextField
        label="Team Name"
        variant="outlined"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
    </Box>
  );
};

export default TeamInput;
