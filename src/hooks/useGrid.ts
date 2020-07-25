import { CellColorOption, transparentColor } from "../logic/cellColors";

const COLORS = Object.values(CellColorOption) as CellColorOption[];

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

const fillInSpace = (
  grid: CellColorOption[][],
  rowCount: number,
  columnCount: number
) => {
  const newGrid = new Array(rowCount)
    .fill([])
    .map((_) => new Array(columnCount));
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (row % 2 === 0 && column % 3 === 0) {
        newGrid[row][column] = transparentColor;
      } else {
        newGrid[row][column] = grid[row][column];
      }
    }
  }
  return newGrid;
};

const useGrid = (
  rowCount: number,
  columnCount: number
): CellColorOption[][] => {
  const initGrid = createGrid(rowCount, columnCount);
  const gridWithSpace = fillInSpace(initGrid, rowCount, columnCount);
  return gridWithSpace;
};

export default useGrid;
