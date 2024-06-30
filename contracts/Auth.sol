// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

contract Auth {
    uint256 public nbOfUsers;
    uint256 public userIdCounter;

    struct User {
        uint256 userId;
        string signatureHash;
        address userAddress;
        bytes32 usernameHash;
        bytes32 emailHash;
        bytes32 passwordHash;
    }

    mapping(uint256 => User) private users;
    mapping(address => uint256[]) private userIdsByAddress;
    mapping(bytes32 => bool) private usernameExistsMapping;
    mapping(bytes32 => bool) private emailExistsMapping;
    mapping(bytes32 => bool) private passwordExistsMapping;

    constructor() {
        nbOfUsers = 0;
        userIdCounter = 1;
    }

    function register(string memory _signature, bytes32 _usernameHash, bytes32 _emailHash, bytes32 _passwordHash) public {
        require(!usernameExistsMapping[_usernameHash], "Username already exists");
        require(!emailExistsMapping[_emailHash], "Email already exists");
        require(!passwordExistsMapping[_passwordHash], "DNI already exists");


        users[userIdCounter] = User({
            userId: userIdCounter,
            signatureHash: _signature,
            userAddress: msg.sender,
            usernameHash: _usernameHash,
            emailHash: _emailHash,
            passwordHash: _passwordHash
        });
        userIdsByAddress[msg.sender].push(userIdCounter);
        usernameExistsMapping[_usernameHash] = true;
        emailExistsMapping[_emailHash] = true;
        passwordExistsMapping[_passwordHash] = true;
        userIdCounter++;
        nbOfUsers++;
    }

    function getSignatureHash(uint256 userId) public view returns (string memory) {
        return users[userId].signatureHash;
    }

    function getUserIdsByAddress(address userAddress) public view returns (uint256[] memory) {
        return userIdsByAddress[userAddress];
    }

    function getAllUserIds() public view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](userIdCounter - 1);
        for (uint256 i = 1; i < userIdCounter; i++) {
            ids[i - 1] = i;
        }
        return ids;
    }

    function getUserIdByHash(string memory _signature) public view returns (uint256) {
        for (uint256 i = 1; i < userIdCounter; i++) {
            if (keccak256(abi.encodePacked(users[i].signatureHash)) == keccak256(abi.encodePacked(_signature))) {
                return i;
            }
        }
        return 0; // return 0 if no matching user is found
    }

    function usernameExists(bytes32 _usernameHash) public view returns (bool) {
        return usernameExistsMapping[_usernameHash];
    }

    function emailExists(bytes32 _emailHash) public view returns (bool) {
        return emailExistsMapping[_emailHash];
    }


    function passwordExists(bytes32 _passwordHash) public view returns (bool) {
        return passwordExistsMapping[_passwordHash];
    }

    function getPasswordHash(uint256 userId) public view returns (bytes32) {
        return users[userId].passwordHash;
    }

    function login(bytes32 _emailHash, bytes32 _passwordHash, address _userAddress) public view returns (bool) {
        for (uint256 i = 1; i < userIdCounter; i++) {
            if (users[i].emailHash == _emailHash && users[i].passwordHash == _passwordHash && users[i].userAddress == _userAddress) {
                return true;
            }
        }
        return false;
    }
}
