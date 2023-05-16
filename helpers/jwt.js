const jwt = require('jsonwebtoken');

const createJWT = (id, name) => {

    return new Promise((resolve, reject) => {
        
        const payload = { id, name };
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if( err ){
                reject('No se pudo generar el token')
            }
            resolve( token );
        })
    })
};

module.exports = {
    createJWT
}