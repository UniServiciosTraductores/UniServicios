// migrations/2_deploy_auth.js
const Auth = artifacts.require("Auth");

module.exports = function(deployer) {
    deployer.deploy(Auth);
};
