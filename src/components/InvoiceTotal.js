import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, TextareaAutosize } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceTotal = ({ selectedItems, calculateTotal, quantities }) => {
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [timestamp, setTimestamp] = useState('');

  // Generate a random 6-digit invoice number each time
  useEffect(() => {
    const randomInvoiceNum = `INV-${Math.floor(100000 + Math.random() * 900000)}`; // Random number between 100000 and 999999
    setInvoiceNumber(randomInvoiceNum);
    setTimestamp(new Date().toLocaleString());
  }, []);

  const total = calculateTotal();
  const finalTotal = total;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 10);
    doc.text(`Timestamp: ${timestamp}`, 20, 20);
    doc.text(`Due Date: ${dueDate}`, 20, 30);

    doc.autoTable({
      startY: 40,
      head: [['Item', 'Price', 'Quantity', 'Total']],
      body: selectedItems.map(item => [
        item.name,
        `$${item.price.toLocaleString()}`,
        quantities[item.name] || 1,
        `$${(item.price * (quantities[item.name] || 1)).toLocaleString()}`
      ])
    });

    doc.text(`Final Total: $${finalTotal.toLocaleString()}`, 20, doc.lastAutoTable.finalY + 10);

    if (notes) {
      doc.text(`Notes: ${notes}`, 20, doc.lastAutoTable.finalY + 20);
    }

    doc.save('invoice.pdf');
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ textAlign: 'center' }}>
          Total Invoice: ${finalTotal.toLocaleString()}
        </Typography>
        
        {/* Invoice Number and Timestamp */}
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', marginTop: 2 }}>
          Invoice Number: {invoiceNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
          Generated on: {timestamp}
        </Typography>

        {/* Due Date Picker */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            variant="outlined"
            sx={{ width: '200px' }}
            InputLabelProps={{
              shrink: true, // Ensures the label is above the input box
            }}
            inputProps={{
              placeholder: 'yyyy-mm-dd', // Adds a placeholder for the date format
            }}
          />
        </Box>

        {/* Notes Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <TextareaAutosize
            minRows={4}
            placeholder="Add any additional notes here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: '80%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </Box>

        {/* Export PDF Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleExportPDF}>
            Export To PDF
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default InvoiceTotal;
