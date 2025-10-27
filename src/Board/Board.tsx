import "./style.css";
import type { BoardProps } from "./types";

export default function Board({ data, handleMove }: BoardProps) {
  return (
    <div className="board">
      {data.map((colData, colIndex) => (
        <div className="column" key={colIndex}>
          {colData.map((rowValue, rowIndex) => (
            <button
              className={`square player${rowValue}`}
              onClick={() => handleMove({ colIndex, rowIndex })}
              key={rowIndex}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
}
