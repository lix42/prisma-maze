import React from "react";
import "./App.css";
import Cell from "./Cell";
import useCells from "./useCells";

function App() {
  const cells = useCells(5, 12);
  return (
    <div className="canvas">
      {cells.flatMap((columns, rowIndex) =>
        columns.map((color, columnIndex) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            color={color}
          />
        ))
      )}
    </div>
  );
}

export default App;
