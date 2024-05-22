// SPDX-License-Identifier: BSD-2-Clause
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert } from "chai";
import { ethers } from "hardhat";


describe("Tic Tac Toe Checker", () => {

  async function deployFixture() {
    const Contract = await ethers.getContractFactory("TicTacToeChecker");
    const contract = await Contract.deploy();
    return contract; 
  };

  it("Should return -1 for a board that is not yet finished", async () => {
    const ticTacToeChecker = await loadFixture(deployFixture);
    assert.equal(
      await ticTacToeChecker.checkBoard(
        [[0,0,1],
        [0,1,2],
        [2,1,0]]
      ), 
      -1
    ); 
  });

  it("Should return 0 for a board that is a draw", async () => {
    const ticTacToeChecker = await loadFixture(deployFixture);
    assert.equal(
      await ticTacToeChecker.checkBoard(
        [[1,1,2],
        [2,2,1],
        [1,1,2]]
      ), 
      0
    );
  });

  it("Should return 1 for a board where X has won horizontally", async () => {
    const ticTacToeChecker = await loadFixture(deployFixture);
    assert.equal(
      await ticTacToeChecker.checkBoard(
        [[1,1,1],
        [0,2,2],
        [0,0,0]]
      ), 
      1
    );
  });

  it("Should return 1 for a board where X has won vertically", async () => {
    const ticTacToeChecker = await loadFixture(deployFixture);
    assert.equal(
      await ticTacToeChecker.checkBoard(
        [[0,1,1],
        [0,1,2],
        [0,1,0]]
      ), 
      1
    );
  });

  it("Should return 1 for a board where X has won diagonally", async () => {
    const ticTacToeChecker = await loadFixture(deployFixture);
    assert.equal(
      await ticTacToeChecker.checkBoard(
        [[1,2,1],
        [0,1,2],
        [0,1,1]]
      ), 
      1
    );
  });

  it("Should return 2 for a board where O has won vertically", async () => {
    const ticTacToeChecker = await loadFixture(deployFixture);
    assert.equal(
      await ticTacToeChecker.checkBoard(
        [[1,1,2],
        [0,2,2],
        [0,2,2]]
      ), 
      2
    );
  });
});
