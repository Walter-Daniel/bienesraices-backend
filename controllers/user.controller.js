const User = require('../schemas/User.schema')

const login = async( req, res ) => {
    console.log(req.body)
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post desde login'
    })
};

const register = async( req, res ) => {
    const {body} = req
    try {
        const user = await User.create(body);
        res.status(201).json({
            ok: true,
            user
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }  
}

module.exports = {
    login,
    register
}