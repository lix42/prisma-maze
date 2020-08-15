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
  transparentColor,
  areColorsRelated,
  isColor,
} from "./cellColors";
import { indexToKey } from "../utils/key";

const isWall = (cell: PositionedUiCell) => cell.cell.type !== UiCellType.Space;

const checking = (condition: boolean) => {
  if (!condition) {
    debugger;
  }
};

const getCellColorFormOneNeighbor = (neighbor: PositionedUiCell) => {
  const primeColor =
    pickRandomUniqueColor(decompositionColor(neighbor.cell.color)) ??
    getRandomPrimaryColor();
  const result = compositeColor(primeColor, getRandomPrimaryColor());
  checking(areColorsRelated(result, neighbor.cell.color));
  return result;
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
  const result = compositeColor(primeColor1, primeColor2);
  checking(areColorsRelated(result, neighbor1.cell.color));
  checking(areColorsRelated(result, neighbor2.cell.color));
  return result;
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
  if (neighbors.length === 0) {
    return getRandomColor();
  }
  if (neighbors.length === 1) {
    return getCellColorFormOneNeighbor(neighbors[0]);
  }
  if (neighbors.length === 2) {
    return getCellColorFormTwoNeighbor(neighbors[0], neighbors[1]);
  }
  return getCellColorFormThreeNeighbor(
    neighbors[0],
    neighbors[1],
    neighbors[2]
  );
};

export const colorMazeWall = (uiGrid: UiGrid) => {
  traverseUiGrid(uiGrid, 0, 0, (cell: PositionedUiCell) => {
    if (cell.cell.type !== UiCellType.Space) {
      const neighbors = getCellNeighbors(
        uiGrid,
        cell.rowIndex,
        cell.columnIndex
      ).filter((n) => isWall(n) && isColor(n.cell.color));
      uiGrid[cell.rowIndex][cell.columnIndex].color = getCellColor(neighbors);
    }
  });
};

export const colorMazePath = (
  uiGrid: UiGrid,
  cellOnPath: Set<string> | null = null
) => {
  if (uiGrid == null) {
    return uiGrid;
  }
  const uiWidth = uiGrid[0].length;
  traverseUiGrid(uiGrid, 0, 0, (cell: PositionedUiCell) => {
    if (
      cell.cell.type === UiCellType.Space &&
      (cellOnPath == null ||
        cellOnPath.has(indexToKey(cell.rowIndex, cell.columnIndex, uiWidth)))
    ) {
      const neighbors = getCellNeighbors(
        uiGrid,
        cell.rowIndex,
        cell.columnIndex
      ).filter((n) => !isWall(n) && isColor(n.cell.color));
      uiGrid[cell.rowIndex][cell.columnIndex].color = getCellColor(neighbors);
    }
  });
};
