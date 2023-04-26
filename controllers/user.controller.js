const User = require('../schemas/User.schema');
const { createJWT } = require('../helpers/jwt');
const { generateTokenInRegister } = require('../helpers/tokenRegister');
const { emailRegister, sendEmailResetPassword } = require('../helpers/email');
const bcrypt = require('bcrypt');

const login = async( req, res ) => {
    console.log(req.body)
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post desde login'
    })
};

const register = async( req, res ) => {
    const {  email, password, name, token } = req.body;
    
    try {

        let emailExist = await User.findOne({ where: {email} });

        if( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        };
        // //Generar JWT
        // const token = await createJWT( user.id, user.name)

        const user = await User.create({
            name,
            email,
            password,
            token: generateTokenInRegister()
        });

        //Enviar información al mail de confirmación
        emailRegister({
            name: user.name,
            email: user.email,
            token: user.token
        })

        res.status(201).json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

const confirmEmail = async(req, res) => {

    const { token } = req.body;
  
    try {
        const user = await User.findOne({ where: {token} });
        if(!user) {
            return res.status(400).json({
                ok: 'false',
                msg: 'No se ha podido confirmar el usuario'
            });
        }
          //confirmar Cuenta 
        user.token = null;
        user.confirm = true;
        await user.save();
        res.status(200).json({
            ok: 'true',
            msg: 'El usuario ha sido confirmado'
        });
    } catch (error) {
        res.status(500).json({
            ok: 'false',
            msg: 'Hable con el administrador'
        });
    };    
};

const resetPassword = async(req, res) => {
    const { email } = req.body;  
    try {
        let userExist = await User.findOne({ where: {email} });
        if( !userExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese correo'
            });
        };
        userExist.token = generateTokenInRegister();
        await userExist.save();

        //Enviar información al mail de recuperación de password
        sendEmailResetPassword({
            name: userExist.name,
            email: userExist.email,
            token: userExist.token
        });

        res.status(200).json({
            ok: true,
            msg: 'El mensaje de recuperación de password ha sido enviado',
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

const checkToken = async(req, res) => {
    const { token } = req.body;
    try {
        let user = await User.findOne({ where: { token } });
        if(!user){
            res.status(400).json({
                ok: false,
                msg: 'Hubo un error al validar tu información'
            });
        };
        res.status(200).json({
            ok: true,
            msg: 'Por favor, ingresar la nueva contraseña'
        })
    } catch (error) {
        console.log(error)
    }
};

const newPassword = async(req, res) => {
    const { password, token } = req.body
    console.log(password, token)
    try {
        let user = await User.findOne({ where: { token } });
        if(!user) {
            res.status(400).json({
                ok: false,
                msg: 'Hubo un error al validar su información'
            });
        }; 

        //Hashear el nuevo password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash( password, salt );

        //Eliminar token
        user.token = null
        await user.save()
        res.status(200).json({
            ok:true,
            msg: 'La contraseña se guardo correctamente'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login,
    register,
    confirmEmail,
    resetPassword,
    checkToken,
    newPassword
}