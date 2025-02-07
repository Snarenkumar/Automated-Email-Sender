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



app.post("/submit", (req, res) => {
    try {
      // Parse the JSON input from the textarea
      let userInput = JSON.parse(req.body.userInput);
  
      // If the parsed input is not an array, check if it's an object with a "message" key
      if (!Array.isArray(userInput)) {
        if (userInput.message && Array.isArray(userInput.message)) {
          userInput = userInput.message;
        } else {
          throw new Error("Invalid JSON format. Expected an array or an object with a 'message' key containing an array.");
        }
      }
  
      // Now userInput is guaranteed to be an array; extract emails
      extractedEmails = userInput.map(user => user.Email).filter(Boolean);
  
      console.log("Extracted Emails:", extractedEmails);
  
      res.redirect("/homepage");
    } catch (error) {
      console.error("Invalid JSON:", error);
      res.send("Invalid JSON format. Please enter valid JSON.");
    }
  });
  
  app.get("/homepage", (req, res) => {
    res.render("homepage", { emails: extractedEmails });
  });
  


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
