import { useState } from "react";
import { CellColor, CellColorOption } from "../components/Cell/component";

const COLORS = Object.keys(CellColor) as CellColorOption[];

const createGrid = (
  rowCount: number,
  columnCount: number
): CellColorOption[][] => {
  const rows = new Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    const columns = new Array(columnCount)
      .fill("")
      .map((_) => COLORS[Math.floor(Math.random() * COLORS.length)]);
    rows[i] = columns;
  }
  return rows;
};

const useCells = (rows: number, columns: number): CellColorOption[][] => {
  const [cells] = useState(createGrid(rows, columns));
  return cells;
};

export default useCells;
