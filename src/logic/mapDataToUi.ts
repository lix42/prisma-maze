import { CellColorOption, transparentColor, endsColor } from "./cellColors";
import { Directions, UiDirections } from "../utils/directions";
import {
  DataGrid,
  DataCell,
  getIdFromCell,
  getCellByIndex,
  getCellById,
  isDataCellLinked,
} from "./grid";
import { strHasLength } from "../utils/typeGuard";
import { UiCell, UiCellType, UiGrid } from "./uiGrid";
import { DataGridPath } from "./resolve";
import { indexToKey } from "../utils/key";

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
      color: CellColorOption.Unset,
    };
    uiGrid[uiRowIndex][uiColumnIndex + 2] = {
      type: UiCellType.Link,
      dataCellId: cellId,
      direction: UiDirections.right,
      color: CellColorOption.Unset,
    };
    if (uiRowIndex > 0) {
      uiGrid[uiRowIndex - 1][uiColumnIndex] = {
        type: UiCellType.Link,
        dataCellId: cellId,
        direction: UiDirections.up,
        color: CellColorOption.Unset,
      };
      uiGrid[uiRowIndex - 1][uiColumnIndex + 1] = {
        type: UiCellType.Link,
        dataCellId: cellId,
        direction: UiDirections.up,
        color: CellColorOption.Unset,
      };
      uiGrid[uiRowIndex - 1][uiColumnIndex + 2] = {
        type: UiCellType.Fixed,
        color: CellColorOption.Unset,
      };
    }
  }
};
export const mapDataToUI = (
  grid: DataGrid,
  ends?: {
    e1RowIndex: number;
    e1ColumnIndex: number;
    e2RowIndex: number;
    e2ColumnIndex: number;
  }
): UiGrid => {
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
  result.forEach((row, rowIndex) =>
    row.forEach((cell, columnIndex) => {
      if (cell.type !== UiCellType.Space && !isCellFilled(cell, grid)) {
        result[rowIndex][columnIndex] = {
          type: UiCellType.Space,
          dataCellId: "",
          color: transparentColor,
        };
      }
    })
  );
  if (ends != null) {
    const { e1RowIndex, e1ColumnIndex, e2RowIndex, e2ColumnIndex } = ends;
    result[e1RowIndex * 2][e1ColumnIndex * 3].color = endsColor;
    result[e2RowIndex * 2][e2ColumnIndex * 3].color = endsColor;
  }
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
          return !isDataCellLinked(dataCell, Directions.right);
        case UiDirections.up:
          return !isDataCellLinked(dataCell, Directions.up);
        case UiDirections.rightAndDown:
          return !(
            isDataCellLinked(dataCell, Directions.right) ||
            isDataCellLinked(dataCell, Directions.down)
          );
        case UiDirections.rightAndUp:
          return !(
            isDataCellLinked(dataCell, Directions.right) ||
            isDataCellLinked(dataCell, Directions.up)
          );
      }
  }
};

export const mapPathToUiIndex = (dataGrid: DataGrid, path: DataGridPath) => {
  const result = new Set<string>();
  const uiWidth = dataGrid.width * 3;
  for (let index = 0; index < path.length; index++) {
    const dataId = path[index];
    const dataCell = getCellById(dataGrid, dataId);
    if (dataCell == null) {
      continue;
    }
    const uiRowIndex = dataCell.rowIndex * 2;
    const uiColumnIndex = dataCell.columnIndex * 3;
    result.add(indexToKey(uiRowIndex, uiColumnIndex, uiWidth));
    if (index < path.length - 1) {
      const next = path[index + 1];
      const found = Object.entries(dataCell.links).find(
        ([_, id]) => id === next
      );
      if (found != null) {
        const direction = found[0];
        switch (direction) {
          case Directions.right:
            result.add(indexToKey(uiRowIndex, uiColumnIndex + 1, uiWidth));
            result.add(indexToKey(uiRowIndex, uiColumnIndex + 2, uiWidth));
            break;
          case Directions.left:
            result.add(indexToKey(uiRowIndex, uiColumnIndex - 1, uiWidth));
            result.add(indexToKey(uiRowIndex, uiColumnIndex - 2, uiWidth));
            break;
          case Directions.up:
            if (dataCell.columnIndex % 2 === 0) {
              result.add(indexToKey(uiRowIndex - 1, uiColumnIndex, uiWidth));
              result.add(
                indexToKey(uiRowIndex - 1, uiColumnIndex + 1, uiWidth)
              );
              result.add(
                indexToKey(uiRowIndex - 2, uiColumnIndex + 1, uiWidth)
              );
            } else {
              result.add(indexToKey(uiRowIndex, uiColumnIndex + 1, uiWidth));
              result.add(
                indexToKey(uiRowIndex - 1, uiColumnIndex + 1, uiWidth)
              );
              result.add(indexToKey(uiRowIndex - 1, uiColumnIndex, uiWidth));
            }
            break;
          case Directions.down:
            if (dataCell.columnIndex % 2 === 0) {
              result.add(indexToKey(uiRowIndex, uiColumnIndex + 1, uiWidth));
              result.add(
                indexToKey(uiRowIndex + 1, uiColumnIndex + 1, uiWidth)
              );
              result.add(indexToKey(uiRowIndex + 1, uiColumnIndex, uiWidth));
            } else {
              result.add(indexToKey(uiRowIndex + 1, uiColumnIndex, uiWidth));
              result.add(
                indexToKey(uiRowIndex + 1, uiColumnIndex + 1, uiWidth)
              );
              result.add(
                indexToKey(uiRowIndex + 2, uiColumnIndex + 1, uiWidth)
              );
            }
            break;
        }
      }
    }
  }
  return result;
};
