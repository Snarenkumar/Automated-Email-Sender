const express = require('express');
const { uploadExcel } = require('../controllers/uploadcontoller');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse JSON request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // Parses form-encoded body

// Routes
router.get('/', (req, res) => res.render('index', { excelData: null, message: null, fileName: null }));

router.get('/json', (req, res) => res.render('terminal'));

router.use(express.static(path.join(__dirname, 'public')));

router.post('/upload', upload.single('excelFile'), uploadExcel);



router.post("/jsonresponse", (req, res) => {
    try {
        let data = req.body.message;
        console.log("Received data:", data);

        res.json({ success: true, redirectTo: "/" }); // Send redirect path in JSON
    } catch (error) {
        console.error("Error processing JSON:", error);
        res.status(400).json({ error: "Invalid JSON format" });
    }
});

module.exports = router;
