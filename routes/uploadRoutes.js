const express = require('express');
const { uploadExcel } = require('../controllers/uploadcontoller');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse JSON request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // Parses form-encoded body

// Middleware to parse URL-encoded request bodies
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/', (req, res) => res.render('index', { excelData: null, message: null, fileName: null }));

router.get('/json', (req, res) => res.render('terminal'));

router.use(express.static(path.join(__dirname, 'public')));

router.post('/upload', upload.single('excelFile'), uploadExcel);

router.post("/jsonresponse", (req, res) => {
    try {
        let data = req.body.message;
        
        // Ensure data is parsed properly
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        
        console.log(data); // Check the structure
        
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(400).json({ error: "Invalid JSON format" });
    }
});

module.exports = router;