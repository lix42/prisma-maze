import {
  UiGrid,
  UiCellType,
  PositionedUiCell,
  traverseUiGrid,
  getCellNeighbors,
} from "./uiGrid";
import {
  CellColorOption,
  getRandomColor,
  decompositionColor,
  pickRandomUniqueColor,
  getRandomPrimaryColor,
  compositeColor,
} from "./cellColors";

const isWall = (cell: PositionedUiCell) => cell.cell.type !== UiCellType.Space;

const getCellColorFormOneNeighbor = (neighbor: PositionedUiCell) => {
  const primeColor =
    pickRandomUniqueColor(decompositionColor(neighbor.cell.color)) ??
    getRandomPrimaryColor();
  return compositeColor(primeColor, getRandomPrimaryColor());
};

const getCellColorFormTwoNeighbor = (
  neighbor1: PositionedUiCell,
  neighbor2: PositionedUiCell
) => {
  const primeColor1 =
    pickRandomUniqueColor(decompositionColor(neighbor1.cell.color)) ??
    getRandomPrimaryColor();
  const primeColor2 =
    pickRandomUniqueColor(decompositionColor(neighbor2.cell.color)) ??
    getRandomPrimaryColor();
  return compositeColor(primeColor1, primeColor2);
};

const getCellColorFormThreeNeighbor = (
  neighbor1: PositionedUiCell,
  neighbor2: PositionedUiCell,
  neighbor3: PositionedUiCell
) => {
  if (neighbor1.cell.color === neighbor2.cell.color) {
    return getCellColorFormTwoNeighbor(neighbor1, neighbor3);
  }
  return getCellColorFormTwoNeighbor(neighbor1, neighbor2);
};

const getCellColor = (neighbors: PositionedUiCell[]) => {
  const coloredNeighbors = neighbors.filter(
    (n) => isWall(n) && n.cell.color !== CellColorOption.Unset
  );
  if (coloredNeighbors.length === 0) {
    return getRandomColor();
  }
  if (coloredNeighbors.length === 1) {
    return getCellColorFormOneNeighbor(coloredNeighbors[0]);
  }
  if (coloredNeighbors.length === 2) {
    return getCellColorFormTwoNeighbor(
      coloredNeighbors[0],
      coloredNeighbors[1]
    );
  }
  return getCellColorFormThreeNeighbor(
    coloredNeighbors[0],
    coloredNeighbors[1],
    coloredNeighbors[2]
  );
};

export const colorMazeWall = (uiGrid: UiGrid) => {
  traverseUiGrid(uiGrid, 0, 0, (cell: PositionedUiCell) => {
    if (cell.cell.type !== UiCellType.Space) {
      const neighbors = getCellNeighbors(
        uiGrid,
        cell.rowIndex,
        cell.columnIndex
      );
      uiGrid[cell.rowIndex][cell.columnIndex].color = getCellColor(neighbors);
    }
  });
};
