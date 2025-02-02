require('dotenv').config();
const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // Ensure this is present
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("RAW BODY CHECK:", req.headers["content-type"], req.body);
    next();
});


// Routes
app.use('/', uploadRoutes);

app.use('/json',uploadRoutes)

app.use('/jsonresponse',uploadRoutes)
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
