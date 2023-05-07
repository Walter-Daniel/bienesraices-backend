const express = require('express');
const router = express.Router();
const { estate } = require('../controllers/realestate.controller');
const validatorCreate = require('../middleware/estate/createEstate');

router.post('/', validatorCreate , estate);

module.exports = router;