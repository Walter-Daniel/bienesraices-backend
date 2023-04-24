const User = require('../schemas/User.schema');
const { createJWT } = require('../helpers/jwt');
const { generateTokenInRegister } = require('../helpers/tokenRegister');

const login = async( req, res ) => {
    console.log(req.body)
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post desde login'
    })
};

const register = async( req, res ) => {
    const {body} = req;
    const {  email, password, name, token } = body;
    
    try {

        let emailExist = await User.findOne({ where: {email} });

        if( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }
        // //Generar JWT
        // const token = await createJWT( user.id, user.name)

        const user = await User.create({
            name,
            email,
            password,
            token: generateTokenInRegister()
        });

        

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



module.exports = {
    login,
    register
}