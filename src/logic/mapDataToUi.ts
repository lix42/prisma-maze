import {
  CellColorOption,
  transparentColor,
  getRandomColor,
} from "./cellColors";
import { Directions, UiDirections } from "../utils/directions";
import {
  DataGrid,
  DataCell,
  getIdFromCell,
  getCellByIndex,
  getCellById,
  isCellLinked,
} from "./grid";
import { strHasLength } from "../utils/typeGuard";
import { UiCell, UiCellType, UiGrid } from "./uiGrid";

const insertDataCellToUiGrid = (uiGrid: UiGrid, cell: DataCell) => {
  const { rowIndex, columnIndex } = cell;
  const cellId = getIdFromCell(cell);
  if (strHasLength(cellId)) {
    const uiRowIndex = rowIndex * 2;
    const uiColumnIndex = columnIndex * 3;
    uiGrid[uiRowIndex][uiColumnIndex] = {
      type: UiCellType.Space,
      dataCellId: cellId,
      color: transparentColor,
    };
    uiGrid[uiRowIndex][uiColumnIndex + 1] = {
      type: UiCellType.Link,
      dataCellId: cellId,
      direction:
        columnIndex % 2 === 0
          ? UiDirections.rightAndDown
          : UiDirections.rightAndUp,
      color: CellColorOption.Red,
    };
    uiGrid[uiRowIndex][uiColumnIndex + 2] = {
      type: UiCellType.Link,
      dataCellId: cellId,
      direction: UiDirections.right,
      color: CellColorOption.Blue,
    };
    if (uiRowIndex > 0) {
      uiGrid[uiRowIndex - 1][uiColumnIndex] = {
        type: UiCellType.Link,
        dataCellId: cellId,
        direction: UiDirections.up,
        color: CellColorOption.Red,
      };
      uiGrid[uiRowIndex - 1][uiColumnIndex + 1] = {
        type: UiCellType.Link,
        dataCellId: cellId,
        direction: UiDirections.up,
        color: CellColorOption.Blue,
      };
      uiGrid[uiRowIndex - 1][uiColumnIndex + 2] = {
        type: UiCellType.Fixed,
        color: CellColorOption.Blue,
      };
    }
  }
};
export const mapDataToUI = (grid: DataGrid): UiGrid => {
  const { width: columnCount, height: rowCount } = grid;
  let result: UiGrid = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    result[rowIndex * 2] = [];
    if (rowIndex < rowCount - 1) {
      result[rowIndex * 2 + 1] = [];
    }
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      const dataCell = getCellByIndex(grid, rowIndex, columnIndex);
      if (dataCell != null) {
        insertDataCellToUiGrid(result, dataCell);
      }
    }
  }
  result.forEach((row) =>
    row.forEach((cell) => {
      if (cell.type !== UiCellType.Space) {
        if (isCellFilled(cell, grid)) {
          cell.color = getRandomColor();
        } else {
          cell.color = transparentColor;
        }
      }
    })
  );
  return result;
};

export const isCellFilled = (cell: UiCell, grid: DataGrid): boolean => {
  switch (cell.type) {
    case UiCellType.Space:
      return false;
    case UiCellType.Fixed:
      return true;
    case UiCellType.Link:
      const { direction, dataCellId } = cell;

      const dataCell = getCellById(grid, dataCellId);
      if (dataCell == null) {
        return false;
      }
      switch (direction) {
        case UiDirections.right:
          return !isCellLinked(dataCell, Directions.right);
        case UiDirections.up:
          return !isCellLinked(dataCell, Directions.up);
        case UiDirections.rightAndDown:
          return !(
            isCellLinked(dataCell, Directions.right) ||
            isCellLinked(dataCell, Directions.down)
          );
        case UiDirections.rightAndUp:
          return !(
            isCellLinked(dataCell, Directions.right) ||
            isCellLinked(dataCell, Directions.up)
          );
      }
  }
};
