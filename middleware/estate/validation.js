const { check } = require("express-validator");
const { fildsValidator }= require('../../helpers/validator');

const createValidation= [
    check('title')
                .notEmpty().withMessage('El título es obligatorio')
                .isLength({ max: 30}).withMessage('Debe tener una longitud máxima de 30 caracteres'),
    check('description')
                .notEmpty().withMessage('La descripción debe ser obligatoria')
                .isLength({ max: 300 }).withMessage('Debe tener una longitud máxima de 300 caracteres'),
    check('direction').notEmpty().withMessage('La dirección debe ser obligatoria'),
    check('size').notEmpty().withMessage('El tamaño de la propiedad obligatorio'),
    check('bedroom').notEmpty().withMessage('La cantidad de baños es obligatoria'),
    check('bathroom').notEmpty().withMessage('La cantidad de habitaciones es obligatoria'),
    check('image').notEmpty().withMessage('La imagen es obligatoria'),
    fildsValidator
]

module.exports = {
    createValidation
};