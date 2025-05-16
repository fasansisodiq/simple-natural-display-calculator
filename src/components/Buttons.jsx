import { Button } from "./Button";

const btnText = [
  ["ce", "ac"],
  ["check →", "correct 00-0", "ans", "%", "√"],
  [7, 8, 9, "÷", "mr"],
  [4, 5, 6, "×", "m–"],
  [1, 2, 3, "−", "m+"],
  [0, "00", "•", "+", "="],
];
export function Buttons() {
  return (
    <div className="button-box">
      {btnText.map((btns) =>
        btns.map((btn, i) => (
          <Button btns={btns} btn={btn} id={typeof btn} key={i} />
        ))
      )}
    </div>
  );
}
