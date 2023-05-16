const { check } = require("express-validator");
const { fildsValidator }= require('../../helpers/validator');

const uploadMiddleware = [
        check('img')
                .notEmpty().withMessage('El campo no debe estar vacío')
                .isLength({ max: 50 }).withMessage('Se exedió el máximo de carateres'),
    fildsValidator
];

module.exports = {
        uploadMiddleware
};