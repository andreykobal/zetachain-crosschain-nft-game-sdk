import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { getHardhatConfigNetworks } from "@zetachain/addresses-tools/dist/networks";

import "./tasks/account";
import "./tasks/faucet";
import "./tasks/balances";
import "./tasks/verify";
import "./tasks/deploy";
import "./tasks/mint";
import "./tasks/transfer";
import "./tasks/getTokensByWallet";


dotenv.config();
const PRIVATE_KEYS =
  process.env.PRIVATE_KEY !== undefined ? [`0x${process.env.PRIVATE_KEY}`] : [];

  const config: HardhatUserConfig = {
    solidity: "0.8.7",
    networks: {
      ...getHardhatConfigNetworks(PRIVATE_KEYS),
      // "bsc-testnet": {
      //   ...getHardhatConfigNetworks(PRIVATE_KEYS)["bsc-testnet"], // Copy existing settings
      //   gas: 20000000, // Set the desired gas limit
      // },
      // goerli: {
      //   ...getHardhatConfigNetworks(PRIVATE_KEYS)["goerli"], // Copy existing settings
      //   gas: 20000000, // Set the desired gas limit //20000000000000000 //20000000
      //   url: `https://eth-goerli.g.alchemy.com/v2/5kJ19pS_d17Gf4Cj8Y7Rcu69MSZRZlYF`,
      // },
      // "polygon-mumbai": {
      //   ...getHardhatConfigNetworks(PRIVATE_KEYS)["polygon-mumbai"], // Copy existing settings
      //   gas: 20000000, // Set the desired gas limit //20000000000000000 //20000000
      // },
    },
  };

task("list-networks", "Lists all the configured networks", async (args, hre) => {
  console.log("Configured Networks:");
  console.log(Object.keys(hre.config.networks).join("\n"));
});

export default config;
