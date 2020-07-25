import {
  CellColorOption,
  TransparentColorType,
  AllCellColors,
  transparentColor,
} from "./cellColors";
import { Directions, UiDirections } from "../utils/directions";
import {
  DataGrid,
  DataCell,
  getIdFromCell,
  getDataCell,
  getCellById,
  isCellLinked,
} from "./grid";
import { strHasLength } from "../utils/typeGuard";
enum UiCellType {
  Space,
  Link,
  Fixed,
}

export type UiCell =
  | {
      readonly type: UiCellType.Space;
      readonly dataCellId: string;
      readonly color: TransparentColorType;
    }
  | {
      readonly type: UiCellType.Link;
      readonly dataCellId: string;
      readonly direction: UiDirections;
      color: AllCellColors;
    }
  | {
      readonly type: UiCellType.Fixed;
      color: CellColorOption;
    };

const insertDataCellToUiGrid = (uiGrid: UiCell[][], cell: DataCell) => {
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
      color: CellColorOption.Pink,
    };
    uiGrid[uiRowIndex][uiColumnIndex + 2] = {
      type: UiCellType.Link,
      dataCellId: cellId,
      direction: UiDirections.right,
      color: CellColorOption.Skyblue,
    };
    if (uiRowIndex > 0) {
      uiGrid[uiRowIndex - 1][uiColumnIndex] = {
        type: UiCellType.Link,
        dataCellId: cellId,
        direction: UiDirections.up,
        color: CellColorOption.Pink,
      };
      uiGrid[uiRowIndex - 1][uiColumnIndex + 1] = {
        type: UiCellType.Link,
        dataCellId: cellId,
        direction: UiDirections.up,
        color: CellColorOption.Skyblue,
      };
      uiGrid[uiRowIndex - 1][uiColumnIndex + 2] = {
        type: UiCellType.Fixed,
        color: CellColorOption.Skyblue,
      };
    }
  }
};
export const mapDataToUI = (grid: DataGrid): UiCell[][] => {
  const { width: columnCount, height: rowCount } = grid;
  let result: UiCell[][] = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    result[rowIndex * 2] = [];
    if (rowIndex < rowCount - 1) {
      result[rowIndex * 2 + 1] = [];
    }
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      const dataCell = getDataCell(grid, rowIndex, columnIndex);
      if (dataCell != null) {
        insertDataCellToUiGrid(result, dataCell);
      }
    }
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
