const express = require('express');
const router = express.Router();
const multer = require('multer');
const ocrResultController = require('../controllers/ocrResultController');

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single('image'),ocrResultController.createOcrResult);
router.get('/images', ocrResultController.getAllOcrResults);


module.exports = router;
