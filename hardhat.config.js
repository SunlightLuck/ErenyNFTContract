require('@nomiclabs/hardhat-waffle')
require('dotenv').config();

module.exports = {
  solidity: "0.8.14",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/ac04d5767eae499fb73df56c3cedaed3`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
}