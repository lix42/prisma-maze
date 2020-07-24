import { DataGrid, Directions } from "./grid";

describe("DataGrid", () => {
  it("should init with given size", () => {
    const dataGrid = new DataGrid(3, 3);
    expect(dataGrid.get(0, 0)).toMatchObject({
      rowIndex: 0,
      columnIndex: 0,
      links: {},
    });
    expect(dataGrid.get(2, 2)).toMatchObject({
      rowIndex: 2,
      columnIndex: 2,
      links: {},
    });
  });
  it("should get with direction", () => {
    const dataGrid = new DataGrid(3, 3);
    expect(dataGrid.get(0, 0, Directions.down)).toMatchObject({
      rowIndex: 1,
      columnIndex: 0,
    });
    expect(dataGrid.get(2, 2, Directions.up)).toMatchObject({
      rowIndex: 1,
      columnIndex: 2,
    });
    expect(dataGrid.get(2, 2, Directions.left)).toMatchObject({
      rowIndex: 2,
      columnIndex: 1,
    });
    expect(dataGrid.get(2, 2, Directions.right)).toMatchObject({
      rowIndex: 2,
      columnIndex: 0,
    });
  });
  it("should return null if rowIndex out of range", () => {
    const dataGrid = new DataGrid(3, 3);
    expect(dataGrid.get(-1, 0)).toBeNull();
    expect(dataGrid.get(3, 0)).toBeNull();
  });
  it("should get wrap when column is out of range", () => {
    const dataGrid = new DataGrid(3, 3);
    expect(dataGrid.get(0, -1)).toMatchObject({
      rowIndex: 0,
      columnIndex: 2,
      links: {},
    });
    expect(dataGrid.get(0, 3)).toMatchObject({
      rowIndex: 0,
      columnIndex: 0,
      links: {},
    });
    expect(dataGrid.get(0, -5)).toMatchObject({
      rowIndex: 0,
      columnIndex: 1,
      links: {},
    });
  });
  it("should connect neighbors", () => {
    const dataGrid = new DataGrid(3, 3);
    dataGrid.connect(1, 1, Directions.right);
    const c1 = dataGrid.get(1, 1);
    const c2 = dataGrid.get(1, 2);
    expect(c1?.links[Directions.right]).toBe(c2);
    expect(c2?.links[Directions.left]).toBe(c1);
  });
  it("should connect wrapping if needed", () => {
    const dataGrid = new DataGrid(3, 3);
    dataGrid.connect(1, 2, Directions.right);
    const c1 = dataGrid.get(1, 2);
    const c2 = dataGrid.get(1, 0);
    expect(c1?.links[Directions.right]).toBe(c2);
    expect(c2?.links[Directions.left]).toBe(c1);
  });
});
