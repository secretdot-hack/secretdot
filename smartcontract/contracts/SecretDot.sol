// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecretDot
 * @dev Use WEB3 infra (Blockchain + ipfs with encryption) to create a dApp for password management, identifying parties via WEB3 AuthN.
 */
contract SecretDot {

    // Estructura para mensajes
    struct Message {
        string ipfsHash;      // Hash del contenido encriptado en IPFS
        address sender;       // Quien envió
        uint256 timestamp;    // Cuándo se envió
    }

    // Mapping: destinatario => array de mensajes
    mapping(address => Message[]) private userMessages;

    // Evento cuando llega un mensaje
    event MessageSent(address indexed sender, address indexed recipient, string ipfsHash);

    // Mapping from user address to their public key
    mapping(address => string) private userPubKeys;
    
    // Event emitted when a user registers their public key
    event PubKeyRegistered(address indexed user, string pubKey);
    
    // Custom error for when a public key is not found
    error PubKeyNotFound(address user);

    /**
    * @dev Enviar mensaje (guardar hash de IPFS)
    */
    function SendMessage(address recipient, string memory ipfsHash) external {
        require(bytes(userPubKeys[recipient]).length > 0, "Recipient not registered");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        userMessages[recipient].push(Message({
            ipfsHash: ipfsHash,
            sender: msg.sender,
            timestamp: block.timestamp
        }));
        
        emit MessageSent(msg.sender, recipient, ipfsHash);
    }

    /**
    * @dev Obtener mensajes del usuario que llama
    */
    function GetMyMessages() external view returns (Message[] memory) {
        return userMessages[msg.sender];
    }
    
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
