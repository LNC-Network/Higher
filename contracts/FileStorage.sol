// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    mapping(address => string[]) private userFiles;

    event FileStored(address indexed user, string ipfsHash);

    function storeFile(string memory _ipfsHash) public {
        userFiles[msg.sender].push(_ipfsHash);
        emit FileStored(msg.sender, _ipfsHash);
    }

    function getUserFiles(address user) public view returns (string[] memory) {
        return userFiles[user];
    }
}
