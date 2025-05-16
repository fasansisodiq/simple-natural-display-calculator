import { useContext } from "react";
import { calcContext } from "../App";

export function Screen() {
  const { input, output } = useContext(calcContext);
  return (
    <div className="screen">
      <div className="input-screen">{input}</div>

      <div className="answer-screen">{output}</div>
    </div>
  );
}
