import { checkPassAll, checkBoardFull } from "../utils";
import type { Settings, State, Move } from "../types";

export function setupBoard(_settings: Settings, _board: number[][]) {
  // empty board
}

export function tryMove(
  _settings: Settings,
  state: State,
  move: Move
): boolean {
  if (state.board[move.colIndex][move.rowIndex]) {
    return false;
  }

  state.board[move.colIndex][move.rowIndex] = state.turn;
  return true;
}

export function checkWinner(settings: Settings, state: State): number {
  let lastValue = 0;
  let inSuccession = 1;

  for (const value of generateLines(settings, state)) {
    if (value && value === lastValue) {
      inSuccession++;
    } else {
      inSuccession = 1;
    }

    if (inSuccession >= 4) {
      return value;
    }

    lastValue = value;
  }

  if (checkPassAll(state) || checkBoardFull(state)) {
    return -1;
  }

  return 0;
}

function* generateLines(settings: Settings, state: State): Generator<number> {
  yield* generateColumns(settings, state);
  yield* generateRows(settings, state);
  yield* generateDiagonals(settings, state, false);
  yield* generateDiagonals(settings, state, true);
}

function* generateColumns(settings: Settings, state: State): Generator<number> {
  for (let colIndex = 0; colIndex < settings.cols; colIndex++) {
    for (let rowIndex = 0; rowIndex < settings.rows; rowIndex++) {
      yield state.board[colIndex][rowIndex];
    }

    yield 0;
  }
}

function* generateRows(settings: Settings, state: State): Generator<number> {
  for (let rowIndex = 0; rowIndex < settings.rows; rowIndex++) {
    for (let colIndex = 0; colIndex < settings.cols; colIndex++) {
      yield state.board[colIndex][rowIndex];
    }

    yield 0;
  }
}

function* generateDiagonals(
  settings: Settings,
  state: State,
  mirrored: boolean
): Generator<number> {
  for (let sum = 0; sum < settings.cols + settings.rows - 1; sum++) {
    let colIndex = Math.min(sum, settings.cols - 1);
    let rowIndex = sum - colIndex;

    while (colIndex >= 0 && rowIndex < settings.rows) {
      const mirroredColIndex = mirrored
        ? settings.cols - 1 - colIndex
        : colIndex;
      yield state.board[mirroredColIndex][rowIndex];
      colIndex--;
      rowIndex++;
    }

    yield 0;
  }
}
