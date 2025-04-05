// import { ethers } from "ethers";
// import { Web3Storage } from "web3.storage";

// const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
// const abi = [
//   "function storeFile(string memory _ipfsHash) public",
//   "function getUserFiles(address user) public view returns (string[] memory)"
// ];

// async function storeFileHashOnAvalanche(ipfsHash: string) {
//   if (!window.ethereum) return alert("Please install MetaMask");

//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const contract = new ethers.Contract(contractAddress, abi, signer);

//   try {
//     const tx = await contract.storeFile(ipfsHash);
//     await tx.wait();
//     alert("File hash stored on Avalanche successfully!");
//   } catch (error) {
//     console.error("Error storing file hash:", error);
//   }
// }
