// import { useState } from "react";
// import { ethers } from "ethers";
// import { Web3Storage } from "web3.storage";
import { Button } from "./ui/button";

// const CONTRACT_ADDRESS = "YOUR_SMART_CONTRACT_ADDRESS";
// const CONTRACT_ABI = [
//   {
//     "constant": false,
//     "inputs": [{ "name": "_cid", "type": "string" }],
//     "name": "storeFile",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [{ "name": "_user", "type": "address" }],
//     "name": "getFile",
//     "outputs": [{ "name": "", "type": "string" }],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

const FileUpload = (/* { message } */) => {
  // const [ipfsUrl, setIpfsUrl] = useState("");

  // const uploadToIPFS = async () => {
  //   if (!message) return;
  //   const blob = new Blob([message], { type: "text/plain" });
  //   const file = new File([blob], "ai-generated-content.txt", { type: "text/plain" });

  //   const client = new Web3Storage({ token: "YOUR_WEB3_STORAGE_API_KEY" });
  //   const cid = await client.put([file]);
  //   const url = `https://ipfs.io/ipfs/${cid}`;
  //   setIpfsUrl(url);
  //   return cid;
  // };

  // const saveToBlockchain = async (cid) => {
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = await provider.getSigner();
  //   const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  //   const tx = await contract.storeFile(cid);
  //   await tx.wait();
  //   console.log("Content stored on blockchain:", cid);
  // };

  // const handleUpload = async () => {
  //   const cid = await uploadToIPFS();
  //   if (cid) await saveToBlockchain(cid);
  // };

  return (
    <div>
      <Button
        /* onClick={handleUpload} */ className="bg-blue-500 hover:bg-blue-600 text-white p-6"
      >
        Upload Content to IPFS
      </Button>
      {/* {ipfsUrl && <p>Content stored at: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a></p>} */}
    </div>
  );
};

export default FileUpload;
