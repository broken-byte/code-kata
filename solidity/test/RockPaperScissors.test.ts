import { ethers } from "hardhat";
import { ContractTransactionResponse, Signer } from 'ethers';
import { expect } from 'chai';
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { 
  GameCreatedEvent, 
  GameStartedEvent, 
  GameCompleteEvent,
  RockPaperScissors 
} from '../typechain-types/rock_paper_scissors/RockPaperScissors';

describe('RockPaperScissors', function() {

  const addressZero = '0x' + '0'.repeat(40);

  async function deployRockPaperScissorsFixture(): Promise<{
    accounts: Signer[];
    contract: RockPaperScissors;
  }> {
    const accounts = await ethers.getSigners();
    const contract = await ethers.deployContract("RockPaperScissors");

    await contract.waitForDeployment();

    return { accounts, contract }; 
  }

  async function getFirstGameCreatedEvent(
    contract: RockPaperScissors
  ): Promise<GameCreatedEvent.LogDescription["args"]> {
    const gameCreatedFilter = contract.filters.GameCreated(undefined, undefined, undefined);
    const gameCreatedEvents = await contract.queryFilter(gameCreatedFilter);
    if (gameCreatedEvents.length > 0) {
      return gameCreatedEvents[0].args as GameCreatedEvent.LogDescription["args"];
    } else {
      throw new Error("No GameCreated events found");
    }
  }

  async function getFirstGameStartedEvent(
    contract: RockPaperScissors
  ): Promise<GameStartedEvent.LogDescription["args"]> {
    const gameStartedFilter = contract.filters.GameStarted(undefined, undefined);
    const gameStartedEvents = await contract.queryFilter(gameStartedFilter);
    if (gameStartedEvents.length > 0) {
      return gameStartedEvents[0].args as GameStartedEvent.LogDescription["args"];
    } else {
      throw new Error("No GameStarted events found");
    }
  }

  async function getFirstGameCompleteEvent(
    contract: RockPaperScissors
  ): Promise<GameCompleteEvent.LogDescription["args"]> {
    const gameCompleteFilter = contract.filters.GameComplete(undefined, undefined);
    const gameCompleteEvents = await contract.queryFilter(gameCompleteFilter);
    if (gameCompleteEvents.length > 0) {
      return gameCompleteEvents[0].args as GameCompleteEvent.LogDescription["args"];
    } else {
      throw new Error("No GameComplete events found");
    }
  }

  async function getTransactionCost(tx: ContractTransactionResponse): Promise<bigint> {
    const txReceipt = await tx.wait();
    const gasUsed = BigInt(txReceipt?.gasUsed ?? 0);
    const gasPrice = BigInt(tx.gasPrice ?? 0);
    const txCost = gasUsed * gasPrice;
    return txCost;
  }
  
  describe('createGame', function() {
    it("should emit a valid GameCreated Event", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const creatorAddress: string = await accounts[0].getAddress();
      const participantAddress: string = await accounts[1].getAddress();

      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      expect(gameCreatedEvent.creator)
        .to.equal(creatorAddress, `Expected the creator to be ${creatorAddress}`);
      expect(gameCreatedEvent.gameNumber)
        .to.not.equal(0, "Expected the game number to be non-zero");
      expect(gameCreatedEvent.bet)
        .to.equal(bet, `Expected the bet amount to be ${bet}`);
    });

    it("it should subtract the bet amount from the creator's balance", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");1000;
      const creatorAddress: string = await accounts[0].getAddress();
      const participantAddress: string = await accounts[1].getAddress();

      const balanceBefore: bigint = await ethers.provider.getBalance(creatorAddress);
      const tx = await contract.createGame(participantAddress, { value: bet });
      const txCost = await getTransactionCost(tx);
      const balanceAfter: bigint = await ethers.provider.getBalance(creatorAddress);

      expect(balanceAfter)
        .to.equal(
          balanceBefore - bet - txCost, 
          "Expected the creator's balance to be reduced by the bet amount (and the transaction cost)"
        );
    });

    it("should not let us create game where we are both the creator and the participant", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const creatorAddress: string = await accounts[0].getAddress();

      await expect(contract.createGame(creatorAddress, { value: bet }))
       .to.be.revertedWith("Cannot create a game with yourself as the participant");
    });

    it("should not let us create a game when no bet is placed", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const participantAddress: string = await accounts[1].getAddress();

      await expect(contract.createGame(participantAddress, { value: 0 }))
       .to.be.revertedWith("No bet placed");
    });
  });

  describe('joinGame', function() {
    it("should let us join a game for a valid participant", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const creatorAddress: string = await accounts[0].getAddress();
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });
      const gameStartedEvent = await getFirstGameStartedEvent(contract);

      expect(gameStartedEvent.gameNumber).to.not.equal(0, "Expected the game number to be non-zero");
      expect(gameStartedEvent.players).to.have.lengthOf(2, "Expected the number of players to be 2");
      expect(gameStartedEvent.players)
        .to.include(creatorAddress, "Expected the first player to be included");
      expect(gameStartedEvent.players)
        .to.include(participantAddress, "Expected the second player to be included");
    });

    it("should subtract the bet amount from the participant's balance", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const creatorAddress: string = await accounts[0].getAddress();
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      const balanceBefore: bigint = await ethers.provider.getBalance(participantAddress);
      const tx = await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });
      const txCost = await getTransactionCost(tx);
      const balanceAfter: bigint = await ethers.provider.getBalance(participantAddress);

      expect(balanceAfter)
        .to.equal(
          balanceBefore - bet - txCost, 
          "Expected the participant's balance to be reduced by the bet amount (and the transaction cost)"
        );
    });

    it ("should not let us join a game with a nonvalid address", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      const contractWithNonWhitelistedAccountAsSigner = contract.connect(accounts[2]);
      await expect(
        contractWithNonWhitelistedAccountAsSigner.joinGame(gameCreatedEvent.gameNumber, { value: bet })
      ).to.be.revertedWith("Sender is not whitelisted as participant");
    });

    it ("should not let us join a game without the correct bet", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      await expect(
        contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet - BigInt(1) })
      ).to.be.revertedWith("Bet amount is too low");
    });

    it ("should not let us join a game that does not exist", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");

      await expect(
        contract.connect(accounts[1]).joinGame(0, { value: bet })
      ).to.be.revertedWith("Game does not exist");
    });

    it("should not let us join a game that has already started", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);
      await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });

      await expect(
        contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet })
      ).to.be.revertedWith("Game has already started");
    });
  });


  describe('makeMove', function() {

    it("should determine a winner and pay them twice the original bet amount", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      const balanceBefore: bigint = await ethers.provider.getBalance(participantAddress);
      const joinGameTx = 
        await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });
      const joinGameTxCost = await getTransactionCost(joinGameTx);
      await contract.connect(accounts[0]).makeMove(gameCreatedEvent.gameNumber, 1); // rock
      const makeMoveTx = 
        await contract.connect(accounts[1]).makeMove(gameCreatedEvent.gameNumber, 2); // paper
      const makeMoveTxCost = await getTransactionCost(makeMoveTx);
      const balanceAfter: bigint = await ethers.provider.getBalance(participantAddress);
      const gameCompleteEvent = await getFirstGameCompleteEvent(contract);

      expect(gameCompleteEvent.winner)
        .to.equal(participantAddress, "Expected the winner to be the participant");
      expect(balanceAfter)
        .to.equal(
          balanceBefore + bet - joinGameTxCost - makeMoveTxCost, 
          "Expected the winner to receive twice the original bet amount (but minus the transaction costs and initial bet)"
        );
    });

    it("should detect a draw", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);
      await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });

      await contract.connect(accounts[0]).makeMove(gameCreatedEvent.gameNumber, 1); // rock
      await contract.connect(accounts[1]).makeMove(gameCreatedEvent.gameNumber, 1); // rock
      const gameCompleteEvent = await getFirstGameCompleteEvent(contract);

      expect(gameCompleteEvent.winner)
        .to.equal(addressZero, "Expected the winner to be the zero address (draw)");
    });

    it("should not let us make a move if we are not a participant", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });

      await expect(contract.connect(accounts[2]).makeMove(gameCreatedEvent.gameNumber, 1))
       .to.be.revertedWith("Sender is not whitelisted as participant");
    });

    it("should not let us make a move if the game does not exist", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);

      await expect(contract.connect(accounts[1]).makeMove(0, 1))
       .to.be.revertedWith("Game does not exist");
    });

    it("should not let us make a move if the game has not started", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      await expect(contract.connect(accounts[1]).makeMove(gameCreatedEvent.gameNumber, 1))
       .to.be.revertedWith("Game has not started yet");
    });

    it("should not let us make a zero move (invalid move)", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);
      await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });

      await expect(contract.connect(accounts[0]).makeMove(gameCreatedEvent.gameNumber, 0))
       .to.be.revertedWith("Invalid move");
    });

    it("should not let us make an invalid move (greater than 3)", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const participantAddress: string = await accounts[1].getAddress();
      await contract.createGame(participantAddress, { value: bet });
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);
      await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });

      await expect(contract.connect(accounts[0]).makeMove(gameCreatedEvent.gameNumber, 4))
       .to.be.revertedWith("Invalid move");
    });
    it("should refund the bet amount to each player if the game is a draw", async function() {
      const { accounts, contract } = await loadFixture(deployRockPaperScissorsFixture);
      const bet: bigint = ethers.parseEther("1");
      const creatorAddress: string = await accounts[0].getAddress();
      const participantAddress: string = await accounts[1].getAddress();

      // Balance before
      const creatorBalanceBefore: bigint = await ethers.provider.getBalance(creatorAddress);
      const participantBalanceBefore: bigint = await ethers.provider.getBalance(participantAddress);

      // First Transaction: Create Game
      const creationTX = await contract.createGame(participantAddress, { value: bet });
      const creationTxCostOnCreator = await getTransactionCost(creationTX);
      const gameCreatedEvent = await getFirstGameCreatedEvent(contract);

      // Second Transaction: Join Game
      const joinGameTx = await contract.connect(accounts[1]).joinGame(gameCreatedEvent.gameNumber, { value: bet });
      const joinGameTxCostOnParticipant = await getTransactionCost(joinGameTx);
    
      // Third Transaction: Make Move
      const makeMoveTxFromCreator = 
        await contract.connect(accounts[0]).makeMove(gameCreatedEvent.gameNumber, 1); // rock
      const makeMoveTxFromParticipant = 
        await contract.connect(accounts[1]).makeMove(gameCreatedEvent.gameNumber, 1); // rock
      const makeMoveTxCostOnCreator = await getTransactionCost(makeMoveTxFromCreator);
      const makeMoveTxCostOnParticipant = await getTransactionCost(makeMoveTxFromParticipant);

      // Balance after
      const creatorBalanceAfter: bigint = await ethers.provider.getBalance(creatorAddress);
      const participantBalanceAfter: bigint = await ethers.provider.getBalance(participantAddress);
      const gameCompleteEvent = await getFirstGameCompleteEvent(contract);

      // Assertions
      expect(creatorBalanceAfter).to.equal(
        creatorBalanceBefore - creationTxCostOnCreator - makeMoveTxCostOnCreator,
        "Expected the creator's balance to be the same as before, i.e., with bet amount refunded (minus transaction costs)"
      );
      expect(participantBalanceAfter).to.equal(
        participantBalanceBefore - joinGameTxCostOnParticipant - makeMoveTxCostOnParticipant,
        "Expected the participant's balance to be the same as before, i.e., with bet amount refunded (minus transaction costs)"
      );
    });
  });
});
