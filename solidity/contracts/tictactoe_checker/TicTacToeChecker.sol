// SPDX-License-Identifier: BSD-2-Clause
pragma solidity ^0.8.16;


/// @title A checker for TicTacToe game
/// @author Your Name
/// @notice This contract checks if a TicTacToe game is solved and if a player has won
contract TicTacToeChecker {

  enum Player {None, X, O }

  /// @notice Determines the state of the TicTacToe game
  /// @param board The current state of the TicTacToe game board
  /// @return The result of the game. 
  ///   - 1 if player X won
  ///   - 2 if player O won
  ///   - -1 if the game is not yet finished 
  ///   - 0 if it's a draw, 
  function checkBoard(uint8[][] memory board) public pure returns (int8) {

    if (playerWon(Player.X, board)) {
      return 1;
    } else if (playerWon(Player.O, board)) {
      return 2;
    } else if (boardIsNotOver(board)) {
      return -1;
    } else {
      // Draw
      return 0;
    }
  }

  /// @notice Determines if a player has won the TicTacToe game
  /// @param player The player to check
  /// @param board The current state of the TicTacToe game
  /// @return true if the player has won, false otherwise
  function playerWon(Player player, uint8[][] memory board) private pure returns (bool) {

    uint8 playerVal = uint8(player);
    uint8 verticalCount1 = 0;
    uint8 verticalCount2 = 0;
    uint8 verticalCount3 = 0;
    uint8 diagonalCount = 0;
    for (uint i = 0; i < 3; i++) {

      uint horizontalCount = 0;
      for (uint j = 0; j < 3; j++) {

        if (board[i][j] == playerVal) {
          if (i == j) {
            diagonalCount++;
          }

          if (j == 0) {
            verticalCount1++;
          } else if (j == 1) {
            verticalCount2++;
          } else {
            verticalCount3++;
          }

          horizontalCount++;
        } 
      }

      if (diagonalCount == 3) {
        return true;
      }

      if (horizontalCount == 3) {
        return true;
      }
    }

    if (diagonalCount == 3) {
      return true;
    }

    if (verticalCount1 == 3 || verticalCount2 == 3 || verticalCount3 == 3) {
      return true;
    } 
  }

  /**
   * @dev Checks if the Tic Tac Toe board is not over.
   * @param board The Tic Tac Toe board represented as a 2D array of uint8 values.
   * @return A boolean indicating whether the board is not over.
   */
  function boardIsNotOver(uint8[][] memory board) private pure returns (bool) {
    
    uint8 countOfUnusedCells = 0;
    for (uint i = 0; i < 3; i++) {
      for (uint j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          countOfUnusedCells++;
        }
      }
    }

    if (countOfUnusedCells > 0) {
      return true;
    } else {
      return false;
    }
  }
}