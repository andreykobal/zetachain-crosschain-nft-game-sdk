// mint.ts

import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const contractName = "CrossChainWarriors";

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  const [signer] = await hre.ethers.getSigners();
  console.log(`🔑 Using account: ${signer.address}\n`);

  const factory = await hre.ethers.getContractFactory(contractName);
  const contract = factory.attach(args.contract);

  const tokenURI = "https://bafkreifaahw4y4z3nknrhtmbsmyrk4kyqo7lnzw5mrcnu57ibpkfuwwrzy.ipfs.nftstorage.link/"; // Provide the token URI here

  const tx = await contract.connect(signer).mint(signer.address, tokenURI); // Pass the tokenURI parameter

  const receipt = await tx.wait();
  const event = receipt.events?.find((event) => event.event === "Transfer");
  const nftId = event?.args?.tokenId.toString();

  console.log(`✅ "mint" transaction has been broadcasted to ${hre.network.name}
📝 Transaction hash: ${receipt.transactionHash}
🌠 Minted NFT ID: ${nftId}
`);
};

const descTask = `Sends a message from one chain to another.`;
const descContractFlag = `Contract address`;

task("mint", descTask, main).addParam("contract", descContractFlag);
