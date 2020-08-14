import React, { useEffect } from "react";
import useGrid from "./hooks/useGrid";
import { Container } from "./components/Container/component";
import { createDataGridConstructMazeAction } from "./reducer/dataGrid";

function App() {
  const { uiGrid, uiGirdWithPath, dispatch, shortestLength } = useGrid(3, 4);
  useEffect(() => dispatch(createDataGridConstructMazeAction(0, 0, 2, 0)), [
    dispatch,
  ]);
  return (
    <Container
      grid={uiGrid}
      gridWithPath={uiGirdWithPath}
      dispatch={dispatch}
      shortestLength={shortestLength}
    />
  );
}

export default App;
