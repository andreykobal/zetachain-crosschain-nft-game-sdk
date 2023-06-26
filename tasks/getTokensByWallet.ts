//getTokensByWallet

import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";

const contractName = "CrossChainWarriors";

interface TokenInfo {
  tokenId: number;
  tokenURI: string;
}
const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
    const [signer] = await hre.ethers.getSigners();
    console.log(`🔑 Using account: ${signer.address}\n`);
  
    const factory = await hre.ethers.getContractFactory(contractName);
    const contract = factory.attach(args.contract);
  
    const walletAddress = args.wallet; // Specify the wallet address as a command line argument
  
    const tokens: any[] = await contract.getTokensByWallet(walletAddress);

    console.log(`Tokens owned by ${walletAddress}:\n`);

    // assuming tokens[0] are IDs and tokens[1] are URIs
    for (let i = 0; i < tokens[0].length; i++) {
        console.log(`Token ID: ${tokens[0][i].toString()}, Token URI: ${tokens[1][i]}`);
    }
};


  


const descTask = `Prints all token IDs and corresponding token URIs owned by a wallet.`;
const descContractFlag = `Contract address`;
const descWalletFlag = `Wallet address`;

task("getTokensByWallet", descTask, main)
  .addParam("contract", descContractFlag)
  .addParam("wallet", descWalletFlag);
