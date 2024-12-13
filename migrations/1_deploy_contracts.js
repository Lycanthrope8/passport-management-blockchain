const PassportRegistry = artifacts.require("PassportRegistry");

module.exports = function (deployer) {
  deployer.deploy(PassportRegistry);
};
