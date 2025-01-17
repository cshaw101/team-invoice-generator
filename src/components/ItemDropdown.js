import React from "react";
import { Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ItemDropdown = ({ storeItems, handleAddItem }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Select Items
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="item-dropdown-label">Choose Item</InputLabel>
        <Select
          labelId="item-dropdown-label"
          onChange={(e) => handleAddItem(JSON.parse(e.target.value))}
          label="Choose Item"
        >
          <MenuItem value="">
            <em>-- Select an item --</em>
          </MenuItem>
          {storeItems.map((item) => (
            <MenuItem key={item.name} value={JSON.stringify(item)}>
              {item.name} - ${item.price.toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ItemDropdown;