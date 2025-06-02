// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SecretDot
 * @dev Use WEB3 infra (Blockchain + ipfs with encryption) to create a dApp for password management, identifying parties via WEB3 AuthN.
 * This contract inherits from OpenZeppelin's Ownable for access control.
 */
contract SecretDot is Ownable {
    /**
     * @dev Constructor initializes the contract and sets the deployer as the owner.
     */
    constructor() Ownable(msg.sender) {
        // No additional initialization needed
    }

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
    
    // Event emitted when a user's public key is deleted
    event PubKeyDeleted(address indexed user, address indexed deletedBy);
    
    // Custom error for when a public key is not found
    error PubKeyNotFoundError(address user);
    
    // Custom error for unauthorized access
    error UnauthorizedAccessError(address caller, address target);

    /**
    * @dev Enviar mensaje (guardar hash de IPFS)
    */
    function SendMessage(address recipient, string memory ipfsHash) external {
        require(bytes(userPubKeys[recipient]).length > 0, "Recipient not registered");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        // Guardar el mensaje en el mapping del receptor
        userMessages[recipient].push(Message({
            ipfsHash: ipfsHash,
            sender: msg.sender,
            timestamp: block.timestamp
        }));

        // Emitir evento para confirmar que el mensaje fue enviado
        emit MessageSent(msg.sender, recipient, ipfsHash);
    }

    /**
    * @dev Obtener mensajes del usuario que llama
    */
    function GetMyMessages() external view returns (Message[] memory) {
        // Verificar que el usuario tenga mensajes
        require(userMessages[msg.sender].length > 0, "No messages found for this user");
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
            revert PubKeyNotFoundError(userAddress);
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
            revert PubKeyNotFoundError(msg.sender);
        }
        
        return storedPubKey;
    }
    
    /**
     * @dev Delete the public key for the calling user
     * @notice This function allows users to delete their own public key.
     * Messages can still be received but will require re-registering a public key to decrypt them.
     */
    function DeleteUserPubKey() external {
        string memory storedPubKey = userPubKeys[msg.sender];
        
        if (bytes(storedPubKey).length == 0) {
            revert PubKeyNotFoundError(msg.sender);
        }
        
        delete userPubKeys[msg.sender];
        emit PubKeyDeleted(msg.sender, msg.sender);
    }
    
    /**
     * @dev Delete the public key for any user (admin function)
     * @notice This function allows the contract owner to delete any user's public key.
     * This can be used for moderation purposes or to assist users who have lost access.
     * @param userAddress The address of the user whose public key should be deleted
     */
    function DeleteUserPubKeyAdmin(address userAddress) external onlyOwner {
        string memory storedPubKey = userPubKeys[userAddress];
        
        if (bytes(storedPubKey).length == 0) {
            revert PubKeyNotFoundError(userAddress);
        }
        
        delete userPubKeys[userAddress];
        emit PubKeyDeleted(userAddress, msg.sender);
    }
}
