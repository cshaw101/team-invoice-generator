import React, { useState } from "react";
import TeamInput from "./components/TeamInput";
import ItemDropdown from "./components/ItemDropdown";
import SelectedItems from "./components/SelectedItems";
import InvoiceTotal from "./components/InvoiceTotal";
import { Container, CssBaseline, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const storeItems = [
  { name: "Soft Tires", price: 10000 },
  { name: "Medium Tires", price: 10000 },
  { name: "Hard Tires", price: 8000 },
  { name: "Inters", price: 8000 },
  { name: "Wet Tires", price: 10000 },
  { name: "Wreck: Tier 1", price: 25000 },
  { name: "Wreck: Tier 2", price: 50000 },
  { name: "Wreck: Tier 3", price: 100000 },
  { name: "Injury: Tier 1", price: 25000 },
  { name: "Injury: Tier 2", price: 40000 },
  { name: "Injury: Tier 3", price: 80000 },
  { name: "Driver Fitness Routine", price: 100000 },
  { name: "Premium Weather Radar", price: 200000 },
  { name: "Wireless Communication", price: 100000 },
  { name: "Rivalry", price: 25000 },
  { name: "Sponsorship: Tier 1", price: 75000 },
  { name: "Sponsorship: Tier 2", price: 150000 },
  { name: "Sponsorship: Tier 3", price: 300000 },
  { name: "Fine: Tier 1", price: 10000 },
  { name: "Fine: Tier 2", price: 25000 },
  { name: "Fine: Tier 3", price: 50000 },
  { name: "FIA Dispute Resolution", price: 50000 },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', // F1 Red
    },
    secondary: {
      main: '#111111', // F1 Black
    },
    background: {
      default: '#F1F1F1', // Light Grey
    },
    text: {
      primary: '#111111', // Dark Grey for text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

const App = () => {
  const [teamName, setTeamName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleAddItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setQuantities({ ...quantities, [item.name]: 1 });
    }
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedItems = selectedItems.filter(item => item !== itemToDelete);
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (itemName, quantity) => {
    setQuantities({ ...quantities, [itemName]: parseInt(quantity) || 1 });
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      return total + item.price * (quantities[item.name] || 1);
    }, 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography variant="h3" color="primary" fontWeight="bold">
            Team Invoice Generator
          </Typography>
        </Box>
        <TeamInput teamName={teamName} setTeamName={setTeamName} />
        <ItemDropdown storeItems={storeItems} handleAddItem={handleAddItem} />
        <SelectedItems
          selectedItems={selectedItems}
          quantities={quantities}
          handleQuantityChange={handleQuantityChange}
          handleDeleteItem={handleDeleteItem}
        />
        <InvoiceTotal
          teamName={teamName}
          selectedItems={selectedItems}
          calculateTotal={calculateTotal}
          setSelectedItems={setSelectedItems}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
