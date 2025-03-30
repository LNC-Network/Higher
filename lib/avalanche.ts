import { ethers } from "ethers";

const AVALANCHE_RPC_URL = process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const contractABI = [
  // Add your smart contract's ABI here
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string ipfsHash;
        string fileName;
        uint256 timestamp;
    }

    mapping(address => File[]) private userFiles;

    event FileUploaded(address indexed user, string ipfsHash, string fileName, uint256 timestamp);

    function uploadFile(string memory _ipfsHash, string memory _fileName) public {
        userFiles[msg.sender].push(File(_ipfsHash, _fileName, block.timestamp));
        emit FileUploaded(msg.sender, _ipfsHash, _fileName, block.timestamp);
    }

    function getUserFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }
}

];

export const getProvider = () => {
  return new ethers.JsonRpcProvider(AVALANCHE_RPC_URL);
};

export const getSigner = () => {
  const provider = getProvider();
  return new ethers.Wallet(PRIVATE_KEY as string, provider);
};

export const getContract = () => {
  const signer = getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS as string, contractABI, signer);
};

export const storeFileHash = async (ipfsHash: string) => {
  try {
    const contract = getContract();
    const tx = await contract.storeHash(ipfsHash);
    await tx.wait();
    console.log("File hash stored on Avalanche:", ipfsHash);
    return tx.hash;
  } catch (error) {
    console.error("Error storing hash:", error);
    throw error;
  }
};

export const retrieveFileHash = async (): Promise<string> => {
  try {
    const contract = getContract();
    const hash = await contract.getStoredHash();
    console.log("Retrieved IPFS hash:", hash);
    return hash;
  } catch (error) {
    console.error("Error retrieving hash:", error);
    throw error;
  }
};
