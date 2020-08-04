import { Directions, oppositeDirection } from "../utils/directions";
import { strHasLength } from "../utils/typeGuard";

type CellId = string;
export type DataCell = {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly links: {
    [Directions.up]?: CellId;
    [Directions.right]?: CellId;
    [Directions.down]?: CellId;
    [Directions.left]?: CellId;
  };
};

export const setCellLink = (
  cell: DataCell,
  direction: Directions,
  neighbor: CellId | undefined
): DataCell => ({
  rowIndex: cell.rowIndex,
  columnIndex: cell.columnIndex,
  links: {
    ...cell.links,
    [direction]: neighbor,
  },
});

export const isCellLinked = (cell: DataCell, direction: Directions): boolean =>
  cell?.links?.[direction] != null;

export type DataGrid = {
  readonly width: number;
  readonly height: number;
  readonly data: {
    readonly [cellId: string]: DataCell;
  };
};

export const getIdFromIndex = (rowIndex: number, columnIndex: number) =>
  `${rowIndex}-${columnIndex}`;

export const getIdFromCell = (cell: DataCell | null) =>
  cell != null ? getIdFromIndex(cell.rowIndex, cell.columnIndex) : null;

export const createDataGrid = (
  rowCount: number,
  columnCount: number
): DataGrid => {
  const data: [string, DataCell][] = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      const cell = {
        rowIndex,
        columnIndex,
        links: {},
      };
      const cellId = getIdFromCell(cell);
      if (strHasLength(cellId)) {
        data.push([cellId, cell]);
      }
    }
  }
  return {
    width: columnCount,
    height: rowCount,
    data: Object.fromEntries(data),
  };
};

export const getCellById = (grid: DataGrid, id?: string): DataCell | null =>
  strHasLength(id) ? grid?.data?.[id] ?? null : null;
export const getCellByIndex = (
  grid: DataGrid,
  rowIndex: number,
  columnIndex: number,
  direction?: Directions
): DataCell | null => {
  if (grid == null) {
    return null;
  }
  const { width, height } = grid;
  if (direction == null) {
    if (rowIndex < 0 || rowIndex >= height) {
      return null;
    }
    columnIndex = columnIndex % width;
    if (columnIndex < 0) {
      columnIndex = width + columnIndex;
    }
    return getCellById(grid, getIdFromIndex(rowIndex, columnIndex));
  }
  switch (direction) {
    case Directions.up:
      return getCellByIndex(grid, rowIndex - 1, columnIndex);
    case Directions.down:
      return getCellByIndex(grid, rowIndex + 1, columnIndex);
    case Directions.left:
      return getCellByIndex(grid, rowIndex, columnIndex - 1);
    case Directions.right:
      return getCellByIndex(grid, rowIndex, columnIndex + 1);
  }
};

export const getCellLinkedNeighbors = (
  grid: DataGrid,
  cellId: string
): string[] => {
  const current = getCellById(grid, cellId);
  if (current == null) {
    return [];
  }
  return Object.values(Directions).reduce((accu, dir) => {
    const target = current.links[dir as Directions];
    if (strHasLength(target)) {
      accu.push(target);
    }
    return accu;
  }, [] as string[]);
};

export const disconnectCell = (
  grid: DataGrid,
  rowIndex: number,
  columnIndex: number,
  direction: Directions
): DataGrid => {
  const c1 = getCellByIndex(grid, rowIndex, columnIndex);
  const c2 = getCellByIndex(grid, rowIndex, columnIndex, direction);
  if (c1 == null || c2 == null) {
    return grid;
  }

  const opposite = oppositeDirection(direction);
  const c1Id = getIdFromCell(c1);
  const c2Id = getIdFromCell(c2);
  if (!strHasLength(c1Id) || !strHasLength(c2Id)) {
    return grid;
  }
  const update: { [id: string]: DataCell } = {};

  update[c1Id] = setCellLink(c1, direction, undefined);
  update[c2Id] = setCellLink(c2, opposite, undefined);
  return {
    width: grid.width,
    height: grid.height,
    data: {
      ...grid.data,
      ...update,
    },
  };
};

export const connectCell = (
  grid: DataGrid,
  rowIndex: number,
  columnIndex: number,
  direction: Directions
): DataGrid => {
  const c1 = getCellByIndex(grid, rowIndex, columnIndex);
  const c2 = getCellByIndex(grid, rowIndex, columnIndex, direction);
  if (c1 == null || c2 == null) {
    return grid;
  }

  const opposite = oppositeDirection(direction);
  const c1Id = getIdFromCell(c1);
  const c2Id = getIdFromCell(c2);
  if (!strHasLength(c1Id) || !strHasLength(c2Id)) {
    return grid;
  }
  const update: { [id: string]: DataCell } = {};

  if (c1.links[direction] === c2Id && c2.links[opposite] === c1Id) {
    return grid;
  }
  const c1AnotherId = c1.links[direction];
  const c1Another = getCellById(grid, c1AnotherId);
  if (strHasLength(c1AnotherId) && c1Another != null) {
    update[c1AnotherId] = setCellLink(c1Another, opposite, undefined);
  }
  const c2AnotherId = c2.links[opposite];
  const c2Another = getCellById(grid, c2AnotherId);
  if (strHasLength(c2AnotherId) && c2Another != null) {
    update[c2AnotherId] = setCellLink(c2Another, direction, undefined);
  }
  update[c1Id] = setCellLink(c1, direction, c2Id);
  update[c2Id] = setCellLink(c2, opposite, c1Id);
  return {
    width: grid.width,
    height: grid.height,
    data: {
      ...grid.data,
      ...update,
    },
  };
};
