
const protectRoutes = async( req, res, next ) => {
    console.log('desde el middleware');
    next();
}

module.exports = protectRoutes;