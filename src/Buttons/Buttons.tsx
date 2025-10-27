import "./style.css";
import type { ButtonsProps } from "./types";

export default function Buttons({ menu, reset, pass, undo }: ButtonsProps) {
  return (
    <div className="buttons">
      <button onClick={menu}>MENU</button>
      <button onClick={reset}>RESET</button>
      <button onClick={pass}>PASS</button>
      <button onClick={undo}>UNDO</button>
    </div>
  );
}
