const express = require('express');
const router = express.Router();
const { estate } = require('../controllers/realestate.controller');
const { createValidation } = require('../middleware/estate/validation');

router.post('/', createValidation, estate);

module.exports = router;