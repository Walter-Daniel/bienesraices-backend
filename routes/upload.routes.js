const express = require('express');
const router = express.Router();
const { uploadMiddleware } = require('../middleware/upload.middleware');
const { deleteImagesCloudinary, getImages, uploadImagesCloudinary } = require('../controllers/upload.controller');

router.get('/', getImages)
router.post('/', uploadMiddleware, uploadImagesCloudinary );
router.delete('/', deleteImagesCloudinary )

module.exports = router;