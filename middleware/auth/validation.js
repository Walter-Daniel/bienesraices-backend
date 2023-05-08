const { check } = require("express-validator");
const { fildsValidator }= require('../../helpers/validator');

const loginMiddleware = [
        check('email')
                .isEmail().withMessage('El email no es válido')
                .isLength({ max: 30 }).withMessage('Se exedió el máximo de carateres'),
        check('password')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isStrongPassword({
                        minLength: 6,
                        maxLength: 12, 
                        minLowercase: 1, 
                        minUppercase: 1, 
                        minSymbols: 1
                        }).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres'),
    fildsValidator
];

const registerMiddleware = [
        check('name')
                .notEmpty().withMessage('El campo Nombre es obligatorio')
                .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/).withMessage('El campo debe contener solamente letras y espacios.')
                .isLength({ min: 2, max: 30}).withMessage('Debe tener una longitud entre 2 y 12 caracteres'),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria')
                .isStrongPassword({
                        minLength: 6,
                        maxLength: 12, 
                        minLowercase: 1, 
                        minUppercase: 1, 
                        minSymbols: 1
                }).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres'),
    fildsValidator
];

const passwordMiddleware = [
        check('password')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isStrongPassword({
                        minLength: 6,
                        maxLength: 12, 
                        minLowercase: 1, 
                        minUppercase: 1, 
                        minSymbols: 1
                }).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres'),
        fildsValidator
]

module.exports = {
        loginMiddleware,
        registerMiddleware,
        passwordMiddleware
};