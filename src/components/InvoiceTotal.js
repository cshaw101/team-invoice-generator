import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceTotal = ({ selectedItems, teamName, calculateTotal, setSelectedItems, quantities }) => {
  const total = calculateTotal();

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for Team: ${teamName}`, 20, 10);
    doc.autoTable({
      startY: 20,
      head: [['Item', 'Price', 'Quantity', 'Total']],
      body: selectedItems.map(item => [
        item.name,
        `$${item.price.toLocaleString()}`,
        quantities[item.name] || 1,
        `$${(item.price * (quantities[item.name] || 1)).toLocaleString()}`
      ])
    });
    doc.text(`Total: $${total.toLocaleString()}`, 20, doc.lastAutoTable.finalY + 10);
    doc.save('invoice.pdf');
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ textAlign: 'center' }}>
          Total Invoice: ${total.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default InvoiceTotal;
