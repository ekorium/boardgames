import { checkPassAll, checkBoardFull } from "../utils";
import type { Settings, State, Move } from "../types";

export function setupBoard(settings: Settings, board: number[][]): void {
  const startCol = Math.floor(settings.cols / 2 - settings.numOfPlayers / 2);
  const startRow = Math.floor(settings.rows / 2 - settings.numOfPlayers / 2);

  for (let dx = 0; dx < settings.numOfPlayers; dx++) {
    for (let dy = 0; dy < settings.numOfPlayers; dy++) {
      const colIndex = startCol + dx;
      const rowIndex = startRow + dy;

      if (inBounds(settings, colIndex, rowIndex)) {
        board[colIndex][rowIndex] = ((dx + dy) % settings.numOfPlayers) + 1;
      }
    }
  }
}

export function tryMove(settings: Settings, state: State, move: Move): boolean {
  if (state.board[move.colIndex][move.rowIndex]) {
    return false;
  }

  state.board[move.colIndex][move.rowIndex] = state.turn;
  let flipped = false;

  for (let dx of [-1, 0, 1]) {
    for (let dy of [-1, 0, 1]) {
      let count = 0;
      let colIndex = move.colIndex;
      let rowIndex = move.rowIndex;

      while (true) {
        count++;
        colIndex += dx;
        rowIndex += dy;

        if (
          !inBounds(settings, colIndex, rowIndex) ||
          !state.board[colIndex][rowIndex]
        ) {
          break;
        }

        if (state.board[colIndex][rowIndex] === state.turn) {
          if (count > 1) {
            while (colIndex !== move.colIndex || rowIndex !== move.rowIndex) {
              colIndex -= dx;
              rowIndex -= dy;
              state.board[colIndex][rowIndex] = state.turn;
            }

            flipped = true;
          }

          break;
        }
      }
    }
  }

  return flipped;
}

export function checkWinner(settings: Settings, state: State): number {
  if (!checkPassAll(state) && !checkBoardFull(state)) {
    return 0;
  }

  const playerScores = Array(settings.numOfPlayers + 1).fill(0);
  let highestScore = 0;
  let bestPlayer = 0;

  for (const player of state.board.flat()) {
    playerScores[player]++;

    if (player && playerScores[player] > highestScore) {
      highestScore = playerScores[player];
      bestPlayer = player;
    }
  }

  if (
    playerScores.some(
      (score, player) =>
        player && player !== bestPlayer && score === highestScore
    )
  ) {
    return -1;
  }

  return bestPlayer;
}

function inBounds(
  settings: Settings,
  colIndex: number,
  rowIndex: number
): boolean {
  return (
    colIndex >= 0 &&
    colIndex < settings.cols &&
    rowIndex >= 0 &&
    rowIndex < settings.rows
  );
}
