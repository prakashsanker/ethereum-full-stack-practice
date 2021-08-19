//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

contract Token {
    string public name = "prakstoken";
    string public tokenSymbol = "PRAKS";
    uint256 public maxSupply = 100000;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = maxSupply;
    }

    function transfer(address to, uint256 amount) public payable {
        require(balances[msg.sender] > 0, "Not enough token supply");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}
