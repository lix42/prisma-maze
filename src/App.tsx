import React from "react";
import useGrid from "./hooks/useGrid";
import { Container } from "./components/Container/component";

function App() {
  const grid = useGrid(5, 12);
  return <Container grid={grid} />;
}

export default App;
