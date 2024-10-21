/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.27", // Your specified Solidity version
  networks: {
    hardhat: {
      chainId: 1337 // This is the default chain ID for the Hardhat network
    }
  }
};
