const User = require('../schemas/User.schema');
const { createJWT } = require('../helpers/jwt');
const { generateTokenInRegister } = require('../helpers/tokenRegister');
const { emailRegister } = require('../helpers/email');

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
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
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
        res.status(200).json({
            ok: 'true',
            msg: 'El usuario ha sido confirmado'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: 'false',
            msg: 'Hable con el administrador'
        });
    };
};



module.exports = {
    login,
    register,
    confirmEmail
}