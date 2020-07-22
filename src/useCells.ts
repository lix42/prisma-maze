import { useState } from "react";

const COLORS = ["pink", "skyblue"];

const createGrid = (rowCount: number, columnCount: number): string[][] => {
  const rows = new Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    const columns = new Array(columnCount)
      .fill("")
      .map((_) => COLORS[Math.floor(Math.random() * COLORS.length)]);
    rows[i] = columns;
  }
  return rows;
};

const useCells = (rows: number, columns: number): string[][] => {
  const [cells] = useState(createGrid(rows, columns));
  return cells;
};

export default useCells;
