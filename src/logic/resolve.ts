import { DataGrid, getCellLinkedNeighbors, getIdFromIndex } from "./grid";
import { arrHasLength, strHasLength } from "../utils/typeGuard";

export type DataGridPath = string[];

const reversePath = (path: DataGridPath) =>
  arrHasLength(path) ? path.reverse() : [];

const expandPath = (
  grid: DataGrid,
  queue: string[],
  visited: Map<string, DataGridPath>,
  targets: Map<string, DataGridPath>
): DataGridPath | null => {
  if (!arrHasLength(queue)) {
    return null;
  }
  const current = queue.shift();
  if (!strHasLength(current)) {
    return null;
  }
  if (!visited.has(current)) {
    // impossible
    return null;
  }
  const currentPath = visited.get(current);
  if (!arrHasLength(currentPath)) {
    return null;
  }
  const nextCellIds = getCellLinkedNeighbors(grid, current);
  let find: DataGridPath | null = null;
  nextCellIds.some((cellId) => {
    if (targets.has(cellId)) {
      const targetPath = targets.get(cellId);
      if (arrHasLength(targetPath)) {
        find = [...currentPath, ...reversePath(targetPath)];
        return true;
      }
    }
    if (!visited.has(cellId)) {
      visited.set(cellId, [...currentPath, cellId]);
      queue.push(cellId);
    }
    return false;
  });
  return find;
};

export const shortestPath = (
  grid: DataGrid,
  p1: string,
  p2: string
): DataGridPath | null => {
  let q1: DataGridPath = [p1];
  let v1 = new Map<string, DataGridPath>([[p1, [p1]]]);
  let q2: DataGridPath = [p2];
  let v2 = new Map<string, DataGridPath>([[p2, [p2]]]);
  let result: DataGridPath | null = null;
  while (arrHasLength(q1) && arrHasLength(q2) && !arrHasLength(result)) {
    result = expandPath(grid, q1, v1, v2) ?? expandPath(grid, q2, v2, v1);
  }
  if (arrHasLength(result) && result[0] !== p1) {
    result = result.reverse();
  }
  return result;
};

export const shortestPathFromIndex = (
  grid: DataGrid,
  rowIndex1: number,
  columnIndex1: number,
  rowIndex2: number,
  columnIndex2: number
) => {
  const p1 = getIdFromIndex(rowIndex1, columnIndex1);
  const p2 = getIdFromIndex(rowIndex2, columnIndex2);
  return shortestPath(grid, p1, p2);
};
