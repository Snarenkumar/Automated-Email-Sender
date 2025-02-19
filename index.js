require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const { sendEmails } = require('./controllers/uploadcontoller');  
const passport =require('passport');
const app = express();

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', uploadRoutes);
app.use('/json', uploadRoutes);

let extractedEmails = [];

app.post("/submit", (req, res) => {
    try {
        let userInput = JSON.parse(req.body.userInput);

        if (!Array.isArray(userInput)) {
            throw new Error("Invalid JSON format. Expected an array.");
        }

        extractedEmails = userInput.map(user => user.Email).filter(Boolean);
        console.log("Extracted Emails:", extractedEmails);

        // Send emails using imported sendEmails function
        sendEmails(extractedEmails);

        res.json({ message: "Emails extracted and sent successfully!", redirectUrl: "/homepage" });
    } catch (error) {
        console.error("Invalid JSON:", error);
        res.status(400).json({ error: "Invalid JSON format." });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
