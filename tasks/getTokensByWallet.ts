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

  const [tokenIds, tokenURIs]: [string[], string[]] = await contract.getTokensByWallet(walletAddress);

  console.log(`Tokens owned by ${walletAddress}:\n`);

  for (let i = 0; i < tokenIds.length; i++) {
    console.log(`Token ID: ${tokenIds[i]}, Token URI: ${tokenURIs[i]}`);
  }
};

const descTask = `Prints all token IDs and corresponding token URIs owned by a wallet.`;
const descContractFlag = `Contract address`;
const descWalletFlag = `Wallet address`;

task("getTokensByWallet", descTask, main)
  .addParam("contract", descContractFlag)
  .addParam("wallet", descWalletFlag);
