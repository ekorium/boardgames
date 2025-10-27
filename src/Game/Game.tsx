import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import Status from "../Status/Status";
import Board from "../Board/Board";
import { initialState, changeState } from "./utils";
import "./style.css";
import type { GameProps, Move } from "./types";

export default function Game({ logic, settings, toMenu }: GameProps) {
  const [state, setState] = useState(initialState(logic, settings));
  const handleReset = () => setState(() => initialState(logic, settings));
  const handleMove = (move?: Move) =>
    setState((oldState) => changeState(logic, settings, oldState, move));
  const handlePass = () => handleMove();
  const handleUndo = () =>
    setState((oldState) => oldState.previous ?? oldState);

  return (
    <div className="game">
      <Status state={state} />
      <Board data={state.board} handleMove={handleMove} />
      <Buttons
        menu={toMenu}
        reset={handleReset}
        pass={handlePass}
        undo={handleUndo}
      />
    </div>
  );
}
