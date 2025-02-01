const express = require('express');
const { uploadExcel } = require('../controllers/uploadcontoller');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => res.render('index', { excelData: null, message: null, fileName: null }));
router.post('/upload', upload.single('excelFile'), uploadExcel);

module.exports = router;

