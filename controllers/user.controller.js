

const login = ( req, res ) => {
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post desde login'
    })
};

const register = ( req, res ) => {
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post'
    })
}

module.exports = {
    login,
    register
}