import confetti from "canvas-confetti";
import "./style.css";
import type { StatusProps } from "./types";

export default function Status({ state }: StatusProps) {
  let message: string;
  let className = "status ";

  if (state.winner === -1) {
    message = "It's a draw!";
  } else if (state.winner) {
    confetti({ origin: { x: 0.5, y: 0.8 } });
    message = `Player ${state.winner} won!`;
    className += `player${state.winner}`;
  } else {
    message = `Player ${state.turn}'s turn`;
    className += `player${state.turn}`;
  }

  return <h2 className={className}>{message}</h2>;
}
