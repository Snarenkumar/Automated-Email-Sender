require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import CORS
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Enable CORS to allow frontend to access backend
app.use(cors());

// Set EJS as the template engine (for server-side rendering)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', uploadRoutes);
app.use('/json', uploadRoutes);
app.use('/jsonresponse', uploadRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
