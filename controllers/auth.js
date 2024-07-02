
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
exports.protectRoute = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const tokenAuthorized = await promisify(jwt.verify)(req.cookies.jwt, 'blockchain');
            if (tokenAuthorized) {
                req.user = tokenAuthorized;
                return next();
            }
        } catch (error) {
            console.log(error);
        }
    }
    res.redirect("/login");
};


// Middleware para prevenir el acceso a /login si ya está autenticado
exports.protectRouteLogOut = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const tokenAuthorized = await promisify(jwt.verify)(req.cookies.jwt, 'blockchain');
            if (tokenAuthorized) {
                return res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    next();
}

exports.logout = async(req,res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
}
    