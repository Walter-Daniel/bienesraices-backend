const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { estate } = require('../controllers/realestate.controller');

router.post('./', estate)

module.exports = router;