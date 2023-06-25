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
      "bsc-testnet": {
        ...getHardhatConfigNetworks(PRIVATE_KEYS)["athens"], // Copy existing settings
        gas: 10000000, // Set the desired gas limit
      },
    },
  };

task("list-networks", "Lists all the configured networks", async (args, hre) => {
  console.log("Configured Networks:");
  console.log(Object.keys(hre.config.networks).join("\n"));
});

export default config;
