
const { Web3 } = require("web3");
const web3 = new Web3('http://127.0.0.1:7545');
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
    

SignData = async (username, defaultAccount) => {
    try {
        if (!username || !defaultAccount) {
            throw new Error('Username o defaultaccount no están definidos');
        }
        const signature = await web3.eth.personal.sign(username, defaultAccount);
        const signedData = web3.eth.accounts.hashMessage(signature);
        return signedData;
    } catch (error) {
        return null;
    }
};


exports.AuthenticationHash = async (
    username,
    defaultAccount,
    password,
    email,
    web3
) => {
    let signedMessage = await SignData(username, defaultAccount);
    let passwordEmailHash = await web3.eth.accounts.hashMessage(
        password + email
    );

    return await web3.eth.accounts.hashMessage(
        signedMessage + passwordEmailHash
    );
};



