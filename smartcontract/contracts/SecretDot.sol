// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecretDot
 * @dev Use WEB3 infra (Blockchain + ipfs with encryption) to create a dApp for password management, identifying parties via WEB3 AuthN.
 */
contract SecretDot {
    // Mapping from user address to their public key
    mapping(address => string) private userPubKeys;
    
    // Event emitted when a user registers their public key
    event PubKeyRegistered(address indexed user, string pubKey);
    
    // Custom error for when a public key is not found
    error PubKeyNotFound(address user);
    
    /**
     * @dev Register a public key for the calling user
     * @param pubkey The public key string to register
     */
    function RegisterUserPubKey(string memory pubkey) external {
        require(bytes(pubkey).length > 0, "Public key cannot be empty");
        
        userPubKeys[msg.sender] = pubkey;
        emit PubKeyRegistered(msg.sender, pubkey);
    }
    
    /**
     * @dev Get the public key for a specific address
     * @param userAddress The address to look up the public key for
     * @return pubkey The public key string associated with the address
     */
    function GetUserPubKey(address userAddress) external view returns (string memory pubkey) {
        string memory storedPubKey = userPubKeys[userAddress];
        
        if (bytes(storedPubKey).length == 0) {
            revert PubKeyNotFound(userAddress);
        }
        
        return storedPubKey;
    }
    
    /**
     * @dev Check if a user has registered a public key
     * @param userAddress The address to check
     * @return bool True if the user has a registered public key, false otherwise
     */
    function HasRegisteredPubKey(address userAddress) external view returns (bool) {
        return bytes(userPubKeys[userAddress]).length > 0;
    }
    
    /**
     * @dev Get the public key for the calling user
     * @return pubkey The public key string associated with msg.sender
     */
    function GetMyPubKey() external view returns (string memory pubkey) {
        string memory storedPubKey = userPubKeys[msg.sender];
        
        if (bytes(storedPubKey).length == 0) {
            revert PubKeyNotFound(msg.sender);
        }
        
        return storedPubKey;
    }
}
