import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
dotenv.config();



const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: { enabled: true, runs: 200 }
        }
      },
    ]
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/3f677989a17b4d9a9a4bb7af8f47d595",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  mocha: {
    timeout: 100000000
  },
};
export default config;
