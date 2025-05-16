import { createContext, memo, useState } from "react";

import "./App.css";
import { Screen } from "./components/Screen";
import { Container } from "./components/Container";

export const calcContext = createContext();
const App = memo(function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [memory, setMemory] = useState("");

  return (
    <div className="app">
      <calcContext.Provider
        value={{ setInput, input, output, setOutput, memory, setMemory }}
      >
        <Screen />
        <Container />
      </calcContext.Provider>
    </div>
  );
});

export default App;
