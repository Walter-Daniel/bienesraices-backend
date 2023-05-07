const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const { estate } = require('../controllers/realestate.controller');
const { fildsValidator }= require('../middleware/validator')

router.post('/', 
[
    body('title').notEmpty().withMessage('Not a valid e-mail address'),
    fildsValidator
    // body('description', 'La descripción es obligatorio'),
    // body('direction').not().isEmpty().withMessage('La dirección debe ser obligatoria'),
    // body('size', 'El tamaño es obligario'  ),
    // body('size', 'El tamaño es obligario'  ).
    // body('size', 'El tamaño es obligario'  )
], estate);

module.exports = router;