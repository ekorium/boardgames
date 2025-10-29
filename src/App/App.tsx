import { useState } from "react";
import Game from "../Game/Game";
import * as connect4 from "../Game/games/connect4";
import * as othello from "../Game/games/othello";
import "./style.css";
import type { Logic } from "../Game/types";

export default function App() {
  const [game, setGame] = useState<Logic>();
  const [numOfPlayers, setNumOfPlayers] = useState(2);
  const [cols, setCols] = useState(8);
  const [rows, setRows] = useState(8);

  if (!game) {
    return (
      <>
        <div className="menu-info">
          <h2>Players: {numOfPlayers}</h2>
          <h2>Board Size: {cols}x{rows}</h2>
        </div>
        <input
          className="menu-slider settings-players"
          type="range"
          min="2"
          max="4"
          value={numOfPlayers}
          onChange={(e) => setNumOfPlayers(parseInt(e.target.value))}
        />
        <input
          className="menu-slider settings-size"
          type="range"
          min="4"
          max="20"
          value={cols}
          onChange={(event) => setCols(parseInt(event.target.value))}
        />
        <input
          className="menu-slider settings-size"
          type="range"
          min="4"
          max="20"
          value={rows}
          onChange={(event) => setRows(parseInt(event.target.value))}
        />
        <button className="menu-button" onClick={() => setGame(connect4)}>
          Connect4
        </button>
        <button className="menu-button" onClick={() => setGame(othello)}>
          Othello
        </button>
      </>
    );
  }

  return (
    <Game
      logic={game}
      settings={{ numOfPlayers, cols, rows}}
      toMenu={() => setGame(undefined)}
    />
  );
}
