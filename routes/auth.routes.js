const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, register, confirmEmail, resetPassword, checkToken, newPassword } = require('../controllers/user.controller');

router.post('/', 
[
        check('email', 'El email es obligatorio AAAAA').isEmail(),
        check('password', 'La contraseña es obligatoria')
                .isStrongPassword({
                        minLength: 6,
                        maxLength: 12, 
                        minLowercase: 1, 
                        minUppercase: 1, 
                        minSymbols: 1
                        }).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres'),
],
     login);
router.post('/register',
[
        check('name', 'El campo Nombre es obligatorio')
                .not().isEmpty()
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
], register);
router.post('/confirm', confirmEmail);

//Pedido para reestablecer nuevo password
router.post('/reset-password', [check('email', 'El email es obligatorio').isEmail()], resetPassword);

//checkear si el token existe
router.post('/check-token', checkToken);

//Crear un nuevo password
router.post('/new-password',[check('password', 'La contraseña es obligatoria')
.isStrongPassword({
        minLength: 6,
        maxLength: 12, 
        minLowercase: 1, 
        minUppercase: 1, 
        minSymbols: 1
}).withMessage('La contraseña debe tener al menos: una letra minúscula, una mayúscula, un caracter especial y una longitud entre 6 y 12 caracteres')], newPassword)

module.exports = router;