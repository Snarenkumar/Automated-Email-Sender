const express = require('express');
const { uploadExcel } = require('../controllers/uploadcontoller');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse JSON request bodies
router.use(express.json());

// Middleware to parse URL-encoded request bodies
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/', (req, res) => res.render('index', { excelData: null, message: null, fileName: null }));

router.get('/json', (req, res) => res.render('terminal'));

router.use(express.static(path.join(__dirname, 'public')));

router.post('/upload', upload.single('excelFile'), uploadExcel);

router.post('/jsonresponse', (req, res) => {
    console.log("Received Data:", req.body);// Log the data to verify
    res.send("works brother");
});

module.exports = router;