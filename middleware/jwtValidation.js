const jwt = require('jsonwebtoken');

const jwtValidation = async( req, res, next ) => {

    //Leer jwt del header
    const token = req.header('x-token');

    //Verificar si hay un Token
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    //Comprobar un Token
    try {
        const { id } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.id = id;
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }  
}

module.exports = {
    jwtValidation
};