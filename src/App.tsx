import React from "react";
import useGrid from "./hooks/useGrid";
import { Container } from "./components/Container/component";

function App() {
  const { uiGrid, dispatch } = useGrid(3, 4);
  return <Container grid={uiGrid} dispatch={dispatch} />;
}

export default App;
