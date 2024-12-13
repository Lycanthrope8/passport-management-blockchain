// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PassportRegistry {
    struct User {
        string name;
        uint age;
        string birthdate;
        string country;
        uint passportID;
    }

    mapping(address => User) public users;
    mapping(address => bool) public predefinedUsers;
    uint public passportCounter;

    event UserRegistered(address userAddress, uint passportID);

    // Register user function
    function registerUser(string memory _name, uint _age, string memory _birthdate, string memory _country) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_age > 0, "Age must be greater than 0");
        require(bytes(_birthdate).length > 0, "Birthdate is required");
        require(bytes(_country).length > 0, "Country is required");

        passportCounter++;
        users[msg.sender] = User(_name, _age, _birthdate, _country, passportCounter);

        emit UserRegistered(msg.sender, passportCounter);
    }

    // Verify user function
    function verifyUser(address _userAddress, uint _age) public view returns (bool, string memory, uint) {
        User memory user = users[_userAddress];
        if (user.age == _age) {
            return (true, user.name, user.passportID);
        }
        return (false, "No matching user found", 0);
    }

    // Set predefined users who can access any user's data
    function setPredefinedUser(address _userAddress) public {
        predefinedUsers[_userAddress] = true;
    }

    // Function for predefined users to access user data
    function getUserData(address _userAddress) public view returns (string memory, uint, string memory, string memory, uint) {
        require(predefinedUsers[msg.sender] == true, "You do not have permission to access this data");
        User memory user = users[_userAddress];
        return (user.name, user.age, user.birthdate, user.country, user.passportID);
    }
}
