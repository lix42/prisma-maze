import {
  TransparentColorType,
  CellColorOption,
  AllCellColors,
} from "./cellColors";
import { UiDirections } from "../utils/directions";

export enum UiCellType {
  Space,
  Link,
  Fixed,
}

export type UiCell =
  | {
      readonly type: UiCellType.Space;
      readonly dataCellId: string;
      color: AllCellColors;
    }
  | {
      readonly type: UiCellType.Link;
      readonly dataCellId: string;
      readonly direction: UiDirections;
      color: CellColorOption;
    }
  | {
      readonly type: UiCellType.Fixed;
      color: CellColorOption;
    };

export type UiGrid = UiCell[][];

export const getUiCell = (
  uiGrid: UiGrid,
  rowIndex: number,
  columnIndex: number
): UiCell | null => uiGrid?.[rowIndex]?.[columnIndex] ?? null;

export type PositionedUiCell = {
  readonly cell: UiCell;
  readonly rowIndex: number;
  readonly columnIndex: number;
};

export const getCellNeighbors = (
  uiGrid: UiGrid,
  rowIndex: number,
  columnIndex: number
): PositionedUiCell[] => {
  const gridWidth = uiGrid?.[0]?.length ?? 0;
  const gridHeight = uiGrid?.length;
  if (gridWidth === 0 || gridHeight === 0) {
    return [];
  }
  if (
    rowIndex < 0 ||
    rowIndex >= gridHeight ||
    columnIndex < 0 ||
    columnIndex >= gridWidth
  ) {
    return [];
  }
  const result: PositionedUiCell[] = [];
  const leftIndex = columnIndex === 0 ? gridWidth - 1 : columnIndex - 1;
  const rightIndex = columnIndex >= gridWidth - 1 ? 0 : columnIndex + 1;
  const leftCell = getUiCell(uiGrid, rowIndex, leftIndex);
  if (leftCell != null) {
    result.push({ cell: leftCell, rowIndex, columnIndex: leftIndex });
  }
  if (rightIndex !== leftIndex) {
    const rightCell = getUiCell(uiGrid, rowIndex, rightIndex);
    if (rightCell != null) {
      result.push({ cell: rightCell, rowIndex, columnIndex: rightIndex });
    }
  }
  const anotherRowIndex = columnIndex % 2 === 0 ? rowIndex - 1 : rowIndex + 1;
  const anotherCell = getUiCell(uiGrid, anotherRowIndex, columnIndex);
  if (anotherCell != null) {
    result.push({ cell: anotherCell, rowIndex: anotherRowIndex, columnIndex });
  }
  return result;
};
export const traverseUiGrid = (
  uiGrid: UiGrid,
  rowIndex: number,
  columnIndex: number,
  visitor: (cell: PositionedUiCell) => void,
  filter: (cell: PositionedUiCell) => boolean = (_) => true,
  deepFirst = false
) => {
  const startCell = getUiCell(uiGrid, rowIndex, columnIndex);
  if (startCell == null) {
    return;
  }
  const queue: PositionedUiCell[] = [];
  const visited = new Set<string>();
  queue.push({ cell: startCell, rowIndex, columnIndex });
  while (queue.length > 0) {
    const current = queue.shift();
    if (current == null) {
      continue;
    }
    const key = `${current.rowIndex}-${current.columnIndex}`;
    if (visited.has(key)) {
      continue;
    }
    visitor(current);
    visited.add(key);
    const next = getCellNeighbors(
      uiGrid,
      current.rowIndex,
      current.columnIndex
    ).filter(filter);
    if (deepFirst) {
      queue.unshift(...next);
    } else {
      queue.push(...next);
    }
  }
};

export const searchUiGrid = (
  predictor: (cell: PositionedUiCell) => boolean,
  uiGrid: UiGrid,
  rowIndex: number = 0,
  columnIndex: number = 0,
  deepFirst = false
): PositionedUiCell | null => {
  const startCell = getUiCell(uiGrid, rowIndex, columnIndex);
  if (startCell == null) {
    return null;
  }
  const queue: PositionedUiCell[] = [];
  const visited = new Set<string>();
  queue.push({ cell: startCell, rowIndex, columnIndex });
  while (queue.length > 0) {
    const current = queue.shift();
    if (current == null) {
      continue;
    }
    const key = `${current.rowIndex}-${current.columnIndex}`;
    if (visited.has(key)) {
      continue;
    }
    if (predictor(current) === true) {
      return current;
    }
    visited.add(key);
    const next = getCellNeighbors(
      uiGrid,
      current.rowIndex,
      current.columnIndex
    );

    if (deepFirst) {
      queue.unshift(...next);
    } else {
      queue.push(...next);
    }
  }
  return null;
};
