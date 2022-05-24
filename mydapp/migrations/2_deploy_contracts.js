var MyContract = artifacts.require("./RegistryRequest.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
