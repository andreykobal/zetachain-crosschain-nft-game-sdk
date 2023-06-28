# Omniverse: ZetaChain Crosschain NFT game SDK 

## SDK for Cross-Chain NFT Game Development with ZetaChain

![zetachain-cover](https://github.com/andreykobal/omniverse-crosschain-nft-game-sdk/assets/19206978/6ed26ace-0d31-42ce-ad32-d4f9b85e92b2)


This SDK provides a set of tools and smart contracts for cross-chain NFT game development. It includes functionality for minting, transferring, and querying NFT tokens across different chains. The SDK is built on top of the ZetaChain blockchain and uses the Hardhat framework for testing and deployment.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- Node.js
- Yarn

## Getting Started

To get started, clone this repository and install the necessary dependencies by running the following command in your terminal:

```shell
yarn
```

## Hardhat Tasks

This SDK includes several Hardhat tasks that can be used for testing and deploying the smart contracts. Below are the available tasks:

### Deploy

```shell
npx hardhat deploy --networks <networks>
```

Deploys the smart contract to the specified networks. Provide a comma-separated list of network names as the `<networks>` parameter. For example:

```shell
npx hardhat deploy --networks goerli,polygon-mumbai,bsc-testnet
```

### Mint

```shell
npx hardhat mint --contract <contract> --network <network> --tokenURI <tokenURI>
```

Mints a new NFT token and assigns it to the specified address. Provide the contract address (`<contract>`), the network name (`<network>`), and the token URI (`<tokenURI>`) as command-line arguments.

### Transfer

```shell
npx hardhat transfer --contract <contract> --network <network> --destination <destination> --address <address> --token <token> --amount <amount>
```

Transfers an NFT token from one chain to another. Provide the contract address (`<contract>`), the source network name (`<network>`), the destination chain ID (`<destination>`), the recipient address (`<address>`), the token ID (`<token>`), and the token amount (`<amount>`) as command-line arguments.

### Get Tokens by Wallet

```shell
npx hardhat getTokensByWallet --contract <contract> --wallet <wallet>
```

Queries all token IDs and corresponding token URIs owned by a wallet address. Provide the contract address (`<contract>`) and the wallet address (`<wallet>`) as command-line arguments.

## Smart Contract

The SDK includes a smart contract called `CrossChainWarriors.sol`. This contract implements the ERC721Enumerable interface and provides additional functionality for cross-chain transfers of NFT tokens. Here are some key methods of the contract:

### Constructor

```solidity
constructor(
    address connectorAddress,
    address zetaTokenAddress,
    address zetaConsumerAddress,
    bool useEven
)
```

The constructor initializes the contract by setting the addresses of the connector, Zeta token, and Zeta consumer contracts. The `useEven` parameter determines whether to mint even or odd token IDs.

### Mint

```solidity
function mint(address to, string memory tokenURI) public returns (uint256)
```

Mints a new NFT token and assigns it to the specified address. The `to` parameter is the recipient address, and the `tokenURI` is the URI of the token metadata.

### CrossChainTransfer

```solidity
function crossChainTransfer(
    uint256 crossChainId,
    address to,
    uint256 tokenId
) external payable
```

Transfers an NFT token from the current chain to another chain. The `crossChainId` parameter is the ID of the destination chain, the `to` parameter is the recipient address on the destination chain, and the `tokenId` is the ID of the

 token to transfer.

### GetTokensByWallet

```solidity
function getTokensByWallet(address wallet) public view returns (string[] memory, string[] memory)
```

Queries all token IDs and corresponding token URIs owned by a wallet address. The `wallet` parameter is the address of the wallet to query.

## Unity Scripts

Unity project with all scripts is located in the `/unity-example` folder. To open - use Unity version 2021.3.x and above

The SDK includes Unity scripts that demonstrate how to interact with the smart contract from a Unity game. The scripts use the Web3Unity library to connect to the blockchain and interact with the contract.

### MintCrossChain

```csharp
async public void MintNftCrossChain()
{
    // ...

    var contract = new Contract(contractAbi, contractAddress);
    var calldata = contract.Calldata(method, new object[]
    {
        toAccount
    });

    // Send transaction
    string response = await Web3Wallet.SendTransaction(chainId, contractAddress, value, calldata, gasLimit, gasPrice);
}
```

This code snippet shows how to mint an NFT token on a specific chain using the `MintNftCrossChain` method. It creates a contract instance using the contract ABI and address, and then generates the contract data for the `mint` method using the `Calldata` function. Finally, it sends the transaction using the `Web3Wallet.SendTransaction` method.

### TransferCrossChain

```csharp
async public void TransferNftCrossChain()
{
    // ...

    var contract = new Contract(contractAbi, contractAddress);
    var calldata = contract.Calldata(method, new object[]
    {
        int.Parse(toChain),
        toAccount,
        int.Parse(tokenId)
    });

    // Send transaction
    string response = await Web3Wallet.SendTransaction(chainId, contractAddress, value, calldata, gasLimit, gasPrice);
}
```

This code snippet demonstrates how to transfer an NFT token from one chain to another using the `TransferNftCrossChain` method. It creates a contract instance, generates the contract data for the `crossChainTransfer` method, and sends the transaction using the `Web3Wallet.SendTransaction` method.

### ReadMetadata

```csharp
async public void CheckCrosschainMetadata()
{
    // ...

    // Iterate over tokenIds and tokenURIs
    for (int i = 0; i < tokenIds.Length; i++)
    {
        string tokenId = tokenIds[i];
        string tokenURI = tokenURIs[i];
        StartCoroutine(GetTokenJson(chainName, tokenId, tokenURI));
    }
}

IEnumerator GetTokenJson(string chainName, string tokenId, string tokenURI)
{
    UnityWebRequest www = UnityWebRequest.Get(tokenURI);
    yield return www.SendWebRequest();

    // Handle the response
    if (www.result == UnityWebRequest.Result.Success)
    {
        string tokenJson = www.downloadHandler.text;
        Debug.Log("Chain: " + chainName + ", Token ID: " + tokenId + ", Token JSON Response: " + tokenJson);
    }
    else
    {
        Debug.LogError("Chain: " + chainName + ", Token ID: " + tokenId + ", Token JSON Request Error: " + www.error);
    }
}
```

These code snippets demonstrate how to check the metadata of NFT tokens on different chains using the `CheckCrosschainMetadata` method. It iterates over the `tokenIds` and `tokenURIs` arrays and makes a request to retrieve the token JSON metadata using the `GetTokenJson` coroutine. It handles the response and logs the token JSON or any error messages.

## Additional Resources

For more information on building decentralized apps on ZetaChain and using the SDK, refer to the tutorials available in the documentation.

[Start building with ZetaChain](https://www.zetachain.com/docs/developers/overview/)

## License

The SDK is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
Note: The code snippets provided in this README.md file are simplified for demonstration purposes. It is recommended to refer to the actual code files for the complete implementation.
