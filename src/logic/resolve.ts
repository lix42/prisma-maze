import { DataGrid, getCellLinkedNeighbors, getIdFromIndex } from "./grid";
import { arrHasLength, strHasLength } from "../utils/typeGuard";

type Path = string[];

const reversePath = (path: Path) => (arrHasLength(path) ? path.reverse() : []);

const expandPath = (
  grid: DataGrid,
  queue: string[],
  visited: Map<string, Path>,
  targets: Map<string, Path>
): Path | null => {
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
  let find: Path | null = null;
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
): Path | null => {
  let q1: Path = [p1];
  let v1 = new Map<string, Path>([[p1, [p1]]]);
  let q2: Path = [p2];
  let v2 = new Map<string, Path>([[p2, [p2]]]);
  let result: Path | null = null;
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
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const p1 = getIdFromIndex(x1, y1);
  const p2 = getIdFromIndex(x2, y2);
  return shortestPath(grid, p1, p2);
};
