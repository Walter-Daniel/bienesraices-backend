const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, register, confirmEmail, resetPassword, checkToken, newPassword } = require('../controllers/user.controller');
const { loginMiddleware, registerMiddleware, passwordMiddleware } = require('../middleware/auth/validation')
const { fildsValidator } = require('../helpers/validator')

router.post('/', loginMiddleware,  login);
router.post('/register', registerMiddleware, register);
router.post('/confirm', confirmEmail);

//Pedido para reestablecer nuevo password
router.post('/reset-password', [ check('email').isEmail().withMessage('El email es obligatorio'), fildsValidator ], resetPassword);

//checkear si el token existe
router.post('/check-token', checkToken);

//Crear un nuevo password
router.post('/new-password', passwordMiddleware , newPassword)

module.exports = router;