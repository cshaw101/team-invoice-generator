import React from "react";
import { Box, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const SelectedItems = ({ selectedItems, quantities, handleQuantityChange, handleDeleteItem }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Selected Items
      </Typography>
      {selectedItems.map((item) => (
        <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="body1">
            {item.name} - ${item.price} x
          </Typography>
          <input
            type="number"
            min="1"
            value={quantities[item.name]}
            onChange={(e) => handleQuantityChange(item.name, e.target.value)}
            style={{ width: "60px", marginRight: "10px" }}
          />
          <IconButton
            color="secondary"
            onClick={() => handleDeleteItem(item)}
            sx={{ padding: 0 }}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default SelectedItems;
