import React from "react";
import useCells from "./hooks/useCells";
import { Container } from "./components/Container/component";

function App() {
  const grid = useCells(5, 12);
  return <Container grid={grid} />;
}

export default App;
