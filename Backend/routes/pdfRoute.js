const express = require('express');
const multer = require('multer');
const { storePDF } = require('../controllers/pdfController');
const router = express.Router();
const upload = multer({ dest: 'pdfs/' });
router.post('/upload', upload.single('pdf'), storePDF);
module.exports = router;
