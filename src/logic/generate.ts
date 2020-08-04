import {
  DataGrid,
  getCellById,
  connectCell,
  getCellByIndex,
  getIdFromCell,
} from "./grid";
import { Directions, getRandomDirection } from "../utils/directions";
import { strHasLength } from "../utils/typeGuard";

type Path = {
  readonly point: string;
  readonly direction: Directions;
}[];

type Visited = {
  points: Set<string>;
  path: Path;
};

const addToVisited = (
  point: string,
  direction: Directions,
  visited: Visited
): Visited => {
  const { points, path } = visited;
  const newPoints = new Set(points.values()).add(point);
  const newPath = [...path, { point, direction }];
  return {
    points: newPoints,
    path: newPath,
  };
};

const findPath = (
  grid: DataGrid,
  point: string,
  visited: Visited,
  connects: Set<string>
): Path | null => {
  if (connects.has(point)) {
    return visited.path;
  }
  if (visited.points.has(point)) {
    return null;
  }
  const currentCell = getCellById(grid, point);
  if (currentCell == null) {
    return null;
  }
  const triedDirection: Directions[] = [];
  for (
    let nextDirection = getRandomDirection(triedDirection);
    nextDirection != null;
    triedDirection.push(nextDirection),
      nextDirection = getRandomDirection(triedDirection)
  ) {
    const nextCell = getCellByIndex(
      grid,
      currentCell?.rowIndex,
      currentCell?.columnIndex,
      nextDirection
    );
    const nextPoint = getIdFromCell(nextCell);
    if (nextCell == null || !strHasLength(nextPoint)) {
      continue;
    }
    const newVisited = addToVisited(point, nextDirection, visited);
    const path = findPath(grid, nextPoint, newVisited, connects);
    if (path != null) {
      return path;
    }
  }
  return null;
};

export const updateConnects = (
  grid: DataGrid,
  point: string,
  connects: Set<string>
) => {
  const visited: Visited = {
    points: new Set(),
    path: [],
  };
  const path = findPath(grid, point, visited, connects);
  if (path == null) {
    return null;
  }
  const newGrid = path.reduce((accu, node) => {
    const cell = getCellById(accu, node.point);

    if (cell == null) {
      return accu;
    }
    const connected = connectCell(
      accu,
      cell.rowIndex,
      cell.columnIndex,
      node.direction
    );
    return connected;
  }, grid);
  const newConnects = path.reduce((accu, { point }) => {
    accu.add(point);
    return accu;
  }, connects);
  return {
    grid: newGrid,
    connects: newConnects,
  };
};

export const generateMaze = (
  grid: DataGrid,
  p1: string,
  p2: string
): DataGrid => {
  // collect points
  const allPoints: string[] = [];
  for (let i = 0; i < grid.height; i++) {
    for (let j = 0; j < grid.width; j++) {
      const cell = getCellByIndex(grid, i, j);
      const cellId = getIdFromCell(cell);
      if (strHasLength(cellId)) {
        allPoints.push(cellId);
      }
    }
  }
  // init main path
  const postFirstPath = updateConnects(grid, p1, new Set([p2]));
  if (postFirstPath == null) {
    return grid;
  }
  let connectedGrid = postFirstPath.grid;
  let connects = postFirstPath.connects;
  // add branches
  let points = allPoints.filter((p) => !connects.has(p));
  while (points.length > 0) {
    const connectResult = updateConnects(connectedGrid, points[0], connects);
    if (connectResult == null) {
      return connectedGrid;
    }
    connectedGrid = connectResult.grid;
    connects = connectResult.connects;
    // eslint-disable-next-line no-loop-func
    points = points.filter((p) => !connects.has(p));
  }
  return connectedGrid;
};
