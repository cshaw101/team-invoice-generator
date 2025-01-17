import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceTotal = ({ selectedItems, teamName, calculateTotal, setSelectedItems, quantities }) => {
  const total = calculateTotal();

  const handleDeleteItem = (itemToDelete) => {
    // Remove the item from the selectedItems list
    const updatedItems = selectedItems.filter(item => item !== itemToDelete);
    setSelectedItems(updatedItems);  // Call the setter function from the parent component
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add Team Name to the PDF
    doc.text(`Team: ${teamName}`, 14, 16);

    // Add Invoice details
    doc.text('Team Invoice', 14, 30);
    doc.autoTable({
      startY: 35,
      head: [['Item', 'Quantity', 'Price']],
      body: selectedItems.map((item) => [
        item.name,
        quantities[item.name] || 1,  // Default quantity is 1 if not specified
        `$${item.price.toLocaleString()}`,
      ]),
    });

    // Display the total on the PDF
    doc.text(`Total: $${total.toLocaleString()}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save('team-invoice.pdf');
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h5" color="secondary" fontWeight="bold">
        Total: ${total.toLocaleString()}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleExportPDF}
        sx={{ mt: 2, padding: '10px 20px' }}
      >
        Export Invoice as PDF
      </Button>
    </Box>
  );
};

export default InvoiceTotal;
