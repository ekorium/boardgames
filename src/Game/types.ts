export interface GameProps {
  logic: Logic;
  settings: Settings;
  toMenu: () => void;
}

export interface Logic {
  setupBoard: (settings: Settings, board: number[][]) => void;
  tryMove: (settings: Settings, state: State, move: Move) => boolean;
  checkWinner: (settings: Settings, state: State) => number;
}

export interface Settings {
  numOfPlayers: number;
  cols: number;
  rows: number;
}

export interface State {
  turn: number;
  board: number[][];
  previous?: State;
  move?: Move;
  winner: number;
}

export interface Move {
  colIndex: number;
  rowIndex: number;
}