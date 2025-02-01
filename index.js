const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

//this is the node module used for the sending mail 
var nodemailer = require('nodemailer');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Route to render the upload page
app.get('/', (req, res) => {
    res.render('index', { excelData: null, message: null, fileName: null });
});

// Route to handle Excel file upload
app.post('/upload', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.render('index', { excelData: null, message: 'No file uploaded.', fileName: null });
    }

    try {
        // Read the uploaded Excel file
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        // Extract only the "Email" field
        const emails = sheetData.map(row => row.Email);

        // Simulate file processing delay
        setTimeout(() => {
            res.render('index', { excelData: emails, message: 'File uploaded successfully!', fileName: req.file.originalname });
        }, 2000);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.render('index', { excelData: null, message: 'Error processing file.', fileName: null });
    }
});


//setup the email procedure 


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});