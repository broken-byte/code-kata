// SPDX-License-Identifier: BSD-2-Clause
pragma solidity ^0.8.0;

contract GiftCoin {
  // keep track of all the addresses that have coins
  mapping(address => uint) coins;
  // keep track of who the owner of this contract is
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  // This is an event we'll broadcast when a gift is successfully sent from one account to another
  event GiftCoinSent(address from, address to, uint amount);

  function sendGiftCoins(address receiver, uint amount) public {
    require(coins[msg.sender] >= amount, "Not enough coins to send this gift");
    coins[msg.sender] -= amount;
    coins[receiver] += amount;
    emit GiftCoinSent(msg.sender, receiver, amount);
  }

  // this function will create new coins and should be reserved for only the owner to call it
  function mintGiftCoins(address targetAddress, uint256 mintedAmount) public onlyOwner {
    coins[targetAddress] += mintedAmount;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }

  // returns the balance of the address in question
  function balanceOf(address targetAddress) public view returns (uint) {
    return coins[targetAddress];
  }
}
