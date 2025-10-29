import type { Logic, Settings, State, Move } from "./types";

export function initialState(logic: Logic, settings: Settings): State {
  const state: State = {
    turn: 1,
    board: Array(settings.cols)
      .fill(0)
      .map(() => Array(settings.rows).fill(0)),
    previous: undefined,
    move: undefined,
    winner: 0,
  };
  logic.setupBoard(settings, state.board);
  state.winner = logic.checkWinner(settings, state);
  return state;
}

export function changeState(
  logic: Logic,
  settings: Settings,
  oldState: State,
  move?: Move
): State {
  if (oldState.winner) {
    return oldState;
  }

  const newState = copyState(oldState);

  if (move && !logic.tryMove(settings, newState, move)) {
    return oldState;
  }

  newState.turn %= settings.numOfPlayers;
  newState.turn++;
  newState.previous = oldState;
  newState.move = move;
  newState.winner = logic.checkWinner(settings, newState);
  return newState;
}

function copyState(state: State): State {
  return {
    ...state,
    board: structuredClone(state.board),
  };
}

export function checkPassAll(state: State): boolean {
  const turn = state.turn;

  while (!state.move && state.previous) {
    state = state.previous;

    if (turn === state.turn) {
      return true;
    }
  }

  return false;
}

export function checkBoardFull(state: State): boolean {
  return state.board.flat().every((value) => value);
}
