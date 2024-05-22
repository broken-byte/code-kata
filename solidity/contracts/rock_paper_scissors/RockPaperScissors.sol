// SPDX-License-Identifier: BSD-2-Clause
pragma solidity ^0.8.0;

contract RockPaperScissors {
  event GameCreated(address creator, uint gameNumber, uint bet);
  event GameStarted(address[2] players, uint gameNumber);
  event GameComplete(address winner, uint gameNumber);

  struct Game {
    address creator;
    address participant;
    bool participantDidJoin;
    address winner;
    uint bet;
    uint gameNumber;
    Move creatorMove;
    Move participantMove;
    bool gameOver;
  }

  mapping(uint => Game) private games;

  enum Move {
    DEFAULT,
    ROCK,
    PAPER,
    SCISSORS
  }

  modifier gameExists(uint gameNumber) {
    require(games[gameNumber].creator != address(0), "Game does not exist");
    _;
  }

  modifier senderIsParticipantOrCreator(uint gameNumber) {
    require(
      games[gameNumber].participant == msg.sender || games[gameNumber].creator == msg.sender,
      "Sender is not whitelisted as participant"
    );
    _;
  }

  modifier gameStarted(uint gameNumber) {
    require(games[gameNumber].participantDidJoin, "Game has not started yet");
    _;
  }

  modifier gameOver(uint gameNumber) {
    require(games[gameNumber].gameOver, "Game is not over");
    _;
  }

  /**
   * Use this endpoint to create a game.
   * It is a payable endpoint meaning the creator of the game will send ether directly to it.
   * The ether sent to the contract should be used as the bet for the game.
   * @param participant - The address of the participant allowed to join the game.
   */
  function createGame(address payable participant) external payable {
    uint bet = msg.value;
    uint gameNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, participant)));

    require(msg.sender != participant, "Cannot create a game with yourself as the participant");
    require(
      participant != address(0),
      "Participant address is required/participant cannot be zero address"
    );

    games[gameNumber] = Game(
      msg.sender,
      participant,
      false,
      address(0),
      bet,
      gameNumber,
      Move.DEFAULT,
      Move.DEFAULT,
      false
    );
    emit GameCreated(msg.sender, gameNumber, bet);
  }

  /**
   * Use this endpoint to join a game.
   * It is a payable endpoint meaning the joining participant will send ether directly to it.
   * The ether sent to the contract should be used as the bet for the game.
   * Any additional ether that exceeds the original bet of the creator should be refunded.
   * @param gameNumber - Corresponds to the gameNumber provided by the GameCreated event
   */
  function joinGame(uint gameNumber) external payable gameExists(gameNumber) {
    Game storage game = games[gameNumber];

    require(game.participant == msg.sender, "Sender is not whitelisted as participant");
    require(msg.value >= game.bet, "Bet amount is too low");

    if (msg.value > game.bet) {
      payable(msg.sender).transfer(msg.value - game.bet);
    }

    game.participantDidJoin = true;

    emit GameStarted([game.creator, game.participant], gameNumber);
  }

  /**
   * Use this endpoint to make a move during a game
   * @param gameNumber - Corresponds to the gameNumber provided by the GameCreated event
   * @param moveNumber - The move for this player (1, 2, or 3 for rock, paper, scissors respectively)
   */
  function makeMove(
    uint gameNumber,
    uint moveNumber
  ) external gameExists(gameNumber) senderIsParticipantOrCreator(gameNumber) {
    Game storage game = games[gameNumber];

    require(game.creator != game.participant, "Game cannot be played alone");
    require(game.participantDidJoin, "Game has not started yet");
    require(!game.gameOver, "Game is already over");

    if (game.creator == msg.sender) {
      game.creatorMove = Move(moveNumber);
    } else {
      game.participantMove = Move(moveNumber);
    }

    if (game.creatorMove != Move.DEFAULT && game.participantMove != Move.DEFAULT) {
      game.gameOver = true;
      game.winner = determineWinner(gameNumber);

      payable(game.winner).transfer(game.bet * 2);
      emit GameComplete(game.winner, gameNumber);
    }
  }

  function determineWinner(uint gameNumber) private view returns (address) {
    Game storage game = games[gameNumber];

    require(game.gameOver, "Game is not over");

    if (game.creatorMove == game.participantMove) {
      return address(0); // Draw.
    } else if (
      (game.creatorMove == Move.ROCK && game.participantMove == Move.SCISSORS) ||
      (game.creatorMove == Move.PAPER && game.participantMove == Move.ROCK) ||
      (game.creatorMove == Move.SCISSORS && game.participantMove == Move.PAPER)
    ) {
      return game.creator; // Creator wins.
    } else {
      return game.participant; // Participant wins.
    }
  }
}
