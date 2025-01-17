import React from "react";
import { Box, Typography, IconButton, TextField, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';

const SelectedItems = ({ selectedItems, quantities, handleQuantityChange, handleDeleteItem }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Selected Items
      </Typography>
      <Grid container spacing={2}>
        {selectedItems.map((item) => (
          <Grid item xs={12} sm={6} key={item.name}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 1 }}>
              <Typography variant="body1">
                {item.name} - ${item.price} x
              </Typography>
              <TextField
                type="number"
                min="1"
                value={quantities[item.name]}
                onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                sx={{ width: '80px', marginRight: '10px' }}
              />
              <IconButton
                color="secondary"
                onClick={() => handleDeleteItem(item)}
                sx={{ padding: 0 }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SelectedItems;
