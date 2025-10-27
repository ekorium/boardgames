import type { Move } from "../Game/types";

export interface BoardProps {
  data: number[][];
  handleMove: (move?: Move) => void;
}
