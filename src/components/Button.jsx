import { useContext, useState } from "react";
import { calcContext } from "../App";

export function Button({ btn, id }) {
  const [answer, setAnswer] = useState();
  const { setInput, setOutput } = useContext(calcContext);
  let { input, output } = useContext(calcContext);
  const str = "string";

  const val = input + btn;

  function handleClick(e) {
    if (
      btn === "00" ||
      btn === "•" ||
      btn === "+" ||
      btn === "×" ||
      btn === "−" ||
      btn === "÷" ||
      btn === "%" ||
      btn === "√" ||
      btn === 1 ||
      btn === 2 ||
      btn === 3 ||
      btn === 4 ||
      btn === 5 ||
      btn === 6 ||
      btn === 7 ||
      btn === 8 ||
      btn === 9 ||
      btn === 0 ||
      btn === "ans"
    ) {
      btn = e.target.innerHTML;
    }

    setInput(val);

    if (input.length >= 35) {
      setInput("Max. Character Reached");
      setOutput(" Press Ac");
    }
  }

  function handleEqual() {
    try {
      localStorage.setItem("inputData", input);
      if (
        input.includes("√") ||
        input.includes("+") ||
        input.includes("−") ||
        input.includes("×") ||
        input.includes("÷") ||
        input.includes("•") ||
        input.includes("%") ||
        input.includes("00") ||
        input.includes("ans")
      ) {
        replacer("−", "-");
        replacer("×", "*");
        replacer("÷", "/");
        replacer("•", ".");
        replacer("00", `${0}${0}`);
        replacer("%", "/ Math.pow(100, 1)");
        if (input.includes("√")) {
          input = input.replaceAll("√", "Math.sqrt(") + ")";
        }
        replacer("ans", answer);
        // console.log(input.length);
        solve(input);
      }

      setOutput(output);
      setAnswer(output);

      // console.log(output);
      localStorage.setItem("outputData", output);
    } catch (error) {
      if (input.length < 1) {
        output = "";
      } else {
        output = "Syntax Error";
      }
      setOutput(output);
      // console.log(error);
    }
  }

  // function that evaluate the calculator input expression
  function solve(expression) {
    let math = expression;
    let result = eval(math).toFixed(9);
    result = Number(result);
    result = result[-1] === 0 ? result.toFixed(result.length - 1) : result;
    output = result;
    setOutput(output);
  }

  // function that replace the natural display synthax
  function replacer(val1, val2) {
    input = input.replaceAll(val1, val2);
  }

  // function to clear the entire screen
  function handleClearScreen() {
    input = " ";
    output = " ";
    setInput(input);
    setOutput(output);
  }

  // function to delete user input on the screen
  function handleDeleteInput() {
    let slicedUserInput = [...input];
    // slicedUserInput.push(input);
    console.log(slicedUserInput);
    if (input.includes("00")) {
      console.log(input);
      slicedUserInput = input.slice(0, -2);
    } else if (input.includes("ans")) {
      slicedUserInput = input.slice(0, -3);
    } else {
      slicedUserInput = input.slice(0, -1);
    }
    input = slicedUserInput;
    setInput(input);
  }

  // check handler
  function handleCheck() {
    setOutput("");
    setInput(localStorage.getItem("inputData"));
  }

  //  CORRECT 00-0 handler
  function handleCorrect() {
    if (input.includes("00")) {
      replacer("00", 0);
      setInput(input);
    }
  }
  // MRC handler
  function handleMemoryRecall() {
    setInput(localStorage.getItem("inputData"));
    setOutput(localStorage.getItem("outputData"));
  }

  // M+ handler
  function handleMemoryPlus() {
    const mPlus = localStorage.getItem("outputData");
    setInput(mPlus + "+");
  }

  // M- handler
  function handleMemoryMinus() {
    const mMinus = localStorage.getItem("outputData");
    setInput(mMinus + "−");
  }

  return (
    <button
      disabled={
        input === "Max. Character Reached" &&
        output === " Press Ac" &&
        btn !== "ac"
          ? true
          : false
      }
      onClick={
        btn === "="
          ? handleEqual
          : btn === "ac"
          ? handleClearScreen
          : btn === "ce"
          ? handleDeleteInput
          : btn === "mr"
          ? handleMemoryRecall
          : btn === "m+"
          ? handleMemoryPlus
          : btn === "m–"
          ? handleMemoryMinus
          : btn === "check →"
          ? handleCheck
          : btn === "correct 00-0"
          ? handleCorrect
          : handleClick
      }
      className={
        id !== str
          ? " btn-green btn-small"
          : btn === "+"
          ? " btn-red btn-big"
          : btn === "="
          ? "btn-blue btn-big"
          : btn === "•"
          ? "btn-green btn-small "
          : btn === "00"
          ? "btn-green btn-small"
          : btn === "ac"
          ? "btn-red btn-medium ac-btn"
          : btn === "ce"
          ? "btn-medium btn-blue ce-btn"
          : "btn-blue btn-medium"
      }
    >
      <span
        className={
          id !== str
            ? "btn-green-txt btn-small"
            : btn === "+"
            ? " btn-red-txt btn-big"
            : btn === "="
            ? "btn-blue-txt btn-big"
            : btn === "•"
            ? "btn-green-txt btn-small "
            : btn === "00"
            ? "btn-green-txt btn-small"
            : btn === "ac"
            ? "btn-red-txt btn-medium ac-txt-btn"
            : btn === "ce"
            ? "btn-medium btn-blue-txt ce-txt-btn"
            : "btn-blue-txt btn-medium"
        }
      >
        {btn}
      </span>
    </button>
  );
}
