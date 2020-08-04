import { generateMaze } from "./generate";
import { createDataGrid, getIdFromIndex, getCellLinkedNeighbors } from "./grid";

describe("generateMaze", () => {
  const dataGrid = createDataGrid(3, 3);
  const p1 = getIdFromIndex(0, 0);
  const p2 = getIdFromIndex(2, 2);
  const maze = generateMaze(dataGrid, p1, p2);
  it("should connect all cell without loop", () => {
    const visited = new Map<string, number>();
    const queue = [p1];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current == null) {
        expect(current).toBeTruthy();
        continue;
      }
      const visitedCount = visited.get(current) ?? 0;
      expect(visitedCount).toBeLessThan(2);
      visited.set(current, visitedCount + 1);
      const neighbors = getCellLinkedNeighbors(maze, current);
      neighbors.filter((n) => !visited.has(n)).forEach((n) => queue.push(n));
    }
    expect(visited.size).toBe(maze.width * maze.height);
  });
});
