import React, { useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InvoiceTotal from './InvoiceTotal';

const items = {
  Tires: [
    { name: 'Soft Tires', price: 10000 },
    { name: 'Medium Tires', price: 10000 },
    { name: 'Hard Tires', price: 8000 },
    { name: 'Inters', price: 8000 },
    { name: 'Wet Tires', price: 10000 },
  ],
  Wrecks: [
    { name: 'Wreck: Tier 1', price: 25000 },
    { name: 'Wreck: Tier 2', price: 50000 },
    { name: 'Wreck: Tier 3', price: 100000 },
  ],
  Injuries: [
    { name: 'Injury: Tier 1', price: 25000 },
    { name: 'Injury: Tier 2', price: 40000 },
    { name: 'Injury: Tier 3', price: 80000 },
  ],
  Premium: [
    { name: 'Driver Fitness Routine', price: 100000 },
    { name: 'Premium Weather Radar', price: 200000 },
    { name: 'Wireless Communication', price: 100000 },
    { name: 'Rivalry', price: 25000 },
  ],
  Sponsorships: [
    { name: 'Sponsorship: Tier 1', price: 75000 },
    { name: 'Sponsorship: Tier 2', price: 150000 },
    { name: 'Sponsorship: Tier 3', price: 300000 },
  ],
  Fines: [
    { name: 'Fine: Tier 1', price: 10000 },
    { name: 'Fine: Tier 2', price: 25000 },
    { name: 'Fine: Tier 3', price: 50000 },
  ],
  FIA: [
    { name: 'FIA Dispute Resolution', price: 50000 },
  ],
};

const FormPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.some((selected) => selected.name === item.name);
    const updatedItems = isSelected
      ? selectedItems.filter((selected) => selected.name !== item.name)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);
    setTotal(updatedItems.reduce((sum, currentItem) => sum + currentItem.price, 0));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Team Invoice Form
      </Typography>
      <Box sx={{ mb: 4 }}>
        {Object.keys(items).map((category) => (
          <Accordion key={category}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {items[category].map((item) => (
                  <FormControlLabel
                    key={item.name}
                    control={
                      <Checkbox
                        checked={selectedItems.some((selected) => selected.name === item.name)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    }
                    label={`${item.name} - $${item.price.toLocaleString()}`}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <InvoiceTotal total={total} selectedItems={selectedItems} />
    </Container>
  );
};

export default FormPage;
