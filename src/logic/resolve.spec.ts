import { shortestPathFromIndex } from "./resolve";
import { createDataGrid, DataGrid, connectCell, getIdFromIndex } from "./grid";
import { Directions } from "../utils/directions";

describe("shortestPath", () => {
  let grid: DataGrid;
  beforeEach(() => {
    grid = createDataGrid(3, 3);
  });
  it("should return null if points cannot be found", () => {
    expect(shortestPathFromIndex(grid, 0, 3, 2, 4)).toBeNull();
  });

  it("should return null if no path exists", () => {
    /*
    o  o  o
    x  o .x
    o .x .o
    */
    const testGrid1 = connectCell(grid, 0, 0, Directions.right);
    const testGrid2 = connectCell(testGrid1, 0, 1, Directions.right);
    const testGrid3 = connectCell(testGrid2, 0, 1, Directions.down);
    const testGrid4 = connectCell(testGrid3, 2, 0, Directions.left);
    expect(shortestPathFromIndex(testGrid4, 0, 0, 2, 2)).toBeNull();
  });

  it("should return path if path exists", () => {
    /*
    o  o  o
    x  o .x
    o .x .o
    */
    const testGrid1 = connectCell(grid, 0, 0, Directions.right);
    const testGrid2 = connectCell(testGrid1, 0, 1, Directions.right);
    const testGrid3 = connectCell(testGrid2, 0, 1, Directions.down);
    const testGrid4 = connectCell(testGrid3, 2, 0, Directions.left);
    expect(shortestPathFromIndex(testGrid4, 0, 0, 1, 1)).toEqual([
      getIdFromIndex(0, 0),
      getIdFromIndex(0, 1),
      getIdFromIndex(1, 1),
    ]);
  });

  it("should return the shortest path if multi path exists", () => {
    /*
    o o x
    o o x
    o o x
    */
    const testGrid1 = connectCell(grid, 0, 0, Directions.right);
    const testGrid2 = connectCell(testGrid1, 0, 1, Directions.down);
    const testGrid3 = connectCell(testGrid2, 1, 1, Directions.down);
    const testGrid4 = connectCell(testGrid3, 2, 1, Directions.left);
    const testGrid5 = connectCell(testGrid4, 2, 0, Directions.up);
    expect(shortestPathFromIndex(testGrid5, 0, 0, 1, 0)).toEqual([
      getIdFromIndex(0, 0),
      getIdFromIndex(0, 1),
      getIdFromIndex(1, 1),
      getIdFromIndex(2, 1),
      getIdFromIndex(2, 0),
      getIdFromIndex(1, 0),
    ]);
    const testGrid6 = connectCell(testGrid5, 1, 1, Directions.left);
    expect(shortestPathFromIndex(testGrid6, 0, 0, 1, 0)).toEqual([
      getIdFromIndex(0, 0),
      getIdFromIndex(0, 1),
      getIdFromIndex(1, 1),
      getIdFromIndex(1, 0),
    ]);
  });
});
