import {
  createDataGrid,
  getDataCell,
  connectCell,
  getIdFromCell,
} from "./grid";
import { Directions } from "../utils/directions";

describe("DataGrid", () => {
  describe("createDataGrid", () => {
    it("should init with given size", () => {
      const dataGrid = createDataGrid(3, 3);
      expect(getDataCell(dataGrid, 0, 0)).toMatchObject({
        rowIndex: 0,
        columnIndex: 0,
        links: {},
      });
      expect(getDataCell(dataGrid, 2, 2)).toMatchObject({
        rowIndex: 2,
        columnIndex: 2,
        links: {},
      });
    });
  });
  describe("getDataCell", () => {
    it("should get with direction", () => {
      const dataGrid = createDataGrid(3, 3);
      expect(getDataCell(dataGrid, 0, 0, Directions.down)).toMatchObject({
        rowIndex: 1,
        columnIndex: 0,
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.up)).toMatchObject({
        rowIndex: 1,
        columnIndex: 2,
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.left)).toMatchObject({
        rowIndex: 2,
        columnIndex: 1,
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.right)).toMatchObject({
        rowIndex: 2,
        columnIndex: 0,
      });
    });
    it("should return null if rowIndex out of range", () => {
      const dataGrid = createDataGrid(3, 3);
      expect(getDataCell(dataGrid, -1, 0)).toBeNull();
      expect(getDataCell(dataGrid, 3, 0)).toBeNull();
    });
    it("should get wrap when column is out of range", () => {
      const dataGrid = createDataGrid(3, 3);
      expect(getDataCell(dataGrid, 0, -1)).toMatchObject({
        rowIndex: 0,
        columnIndex: 2,
        links: {},
      });
      expect(getDataCell(dataGrid, 0, 3)).toMatchObject({
        rowIndex: 0,
        columnIndex: 0,
        links: {},
      });
      expect(getDataCell(dataGrid, 0, -5)).toMatchObject({
        rowIndex: 0,
        columnIndex: 1,
        links: {},
      });
    });
    it("should get cell on the given direction", () => {
      const dataGrid = createDataGrid(3, 3);
      expect(getDataCell(dataGrid, 0, 0, Directions.left)).toMatchObject({
        rowIndex: 0,
        columnIndex: 2,
        links: {},
      });
      expect(getDataCell(dataGrid, 0, 0, Directions.right)).toMatchObject({
        rowIndex: 0,
        columnIndex: 1,
        links: {},
      });
      expect(getDataCell(dataGrid, 0, 0, Directions.up)).toBeNull();
      expect(getDataCell(dataGrid, 0, 0, Directions.down)).toMatchObject({
        rowIndex: 1,
        columnIndex: 0,
        links: {},
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.left)).toMatchObject({
        rowIndex: 2,
        columnIndex: 1,
        links: {},
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.right)).toMatchObject({
        rowIndex: 2,
        columnIndex: 0,
        links: {},
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.up)).toMatchObject({
        rowIndex: 1,
        columnIndex: 2,
        links: {},
      });
      expect(getDataCell(dataGrid, 2, 2, Directions.down)).toBeNull();
    });
  });
  describe("connectCell", () => {
    it("should return a new grid", () => {
      const dataGrid = createDataGrid(3, 3);
      const oldGridSerialized = JSON.stringify(dataGrid);
      const newGrid = connectCell(dataGrid, 1, 1, Directions.right);
      expect(newGrid).not.toBe(dataGrid);
      expect(JSON.stringify(dataGrid)).toBe(oldGridSerialized);
    });
    it("should connect neighbors", () => {
      const dataGrid = createDataGrid(3, 3);
      const newGrid = connectCell(dataGrid, 1, 1, Directions.right);
      const c1 = getDataCell(newGrid, 1, 1);
      const c2 = getDataCell(newGrid, 1, 2);
      expect(c1?.links[Directions.right]).toBe(getIdFromCell(c2));
      expect(c2?.links[Directions.left]).toBe(getIdFromCell(c1));
    });
    it("should connect wrapping if needed", () => {
      const dataGrid = createDataGrid(3, 3);
      const newGrid = connectCell(dataGrid, 1, 2, Directions.right);
      const c1 = getDataCell(newGrid, 1, 2);
      const c2 = getDataCell(newGrid, 1, 0);
      expect(c1?.links[Directions.right]).toBe(getIdFromCell(c2));
      expect(c2?.links[Directions.left]).toBe(getIdFromCell(c1));
    });
  });
});
