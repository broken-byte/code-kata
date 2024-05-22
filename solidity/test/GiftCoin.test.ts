import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { GiftCoin } from "../typechain-types/gift_coin/GiftCoin";
import { expect } from "chai";
import { Signer } from "ethers";

describe("GiftCoinContract", function() {
  async function deployFixture() {
    const accounts: Signer[] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("GiftCoin");
    const contract: GiftCoin = await Contract.deploy();
    return { accounts, contract }; 
  } 
  
  it("should start an account with 0 coins using balanceOf()", async function() {
    const { accounts, contract } = await loadFixture(deployFixture);
    const balance = await contract.balanceOf(accounts[0].getAddress());
    expect(balance.valueOf()).to.equal(0, "addresses should initially have zero coins");
  });
  
  it("should allow the owner to mint coins", async function() {
    const { accounts, contract } = await loadFixture(deployFixture);
    const owner = accounts[0];
    
    await contract.mintGiftCoins(owner.getAddress(), 100);
    let ownerBalance = await contract.balanceOf(owner.getAddress());
    expect(ownerBalance.valueOf()).to.equal(100);
  });

  it("should not allow non-owners to mint coins", async function() {
    const { accounts, contract } = await loadFixture(deployFixture);
    const nonOwner = accounts[1];
    const contractWithNonOwnerAsSigner = contract.connect(nonOwner);
    await expect(contractWithNonOwnerAsSigner.mintGiftCoins(nonOwner.getAddress(), 100))
      .to.be.revertedWith("Only the owner can call this function");
  });

  it("should allow the owner to send coins as a gift", async function() {
    const { accounts, contract } = await loadFixture(deployFixture);
    const owner = accounts[0];
    const recipient = accounts[1];
    
    await contract.mintGiftCoins(owner.getAddress(), 100);
    await contract.sendGiftCoins(recipient.getAddress(), 50);
    
    let ownerBalance = await contract.balanceOf(owner.getAddress());
    let recipientBalance = await contract.balanceOf(recipient.getAddress());
    expect(ownerBalance.valueOf()).to.equal(50);
    expect(recipientBalance.valueOf()).to.equal(50);
  });

  it("should not allow transfers of more coins than the sender has", async function() {
    const { accounts, contract } = await loadFixture(deployFixture);
    const owner = accounts[0];
    const recipient = accounts[1];
    
    await contract.mintGiftCoins(owner.getAddress(), 100);
    await expect(contract.sendGiftCoins(recipient.getAddress(), 101))
      .to.be.revertedWith("Not enough coins to send this gift");
  });
});
