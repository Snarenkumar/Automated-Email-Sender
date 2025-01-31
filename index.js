const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.static('public')); // For serving static files

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory (not disk)
const upload = multer({ storage: storage });

// Route to render the upload page
app.get('/', (req, res) => {
    res.render('index', { excelData: null });
});

// Route to handle Excel file upload
app.post('/upload', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' }); // Read Excel file from memory
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON
        sheetData.forEach(element => {
            console.log(element)
            
        });
        // Extract only the "Email" field from each row
        const emails = sheetData.map(row => row.Email);
        const name = sheetData.map(row => row.Name);
        emails.forEach(element => {
            console.log(element)
            
        });
        name.forEach(element => {
            console.log(element)
            
        });

        res.render('index', { excelData: emails }); // Send only email data to EJS
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).send('Error processing file');
    }
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
