import {
  createDataGrid,
  getIdFromIndex,
  getCellByIndex,
  isCellLinked,
} from "../logic/grid";
import {
  dataGridReducer,
  createDataGridConnectAction,
  createDataGridDisconnectAction,
  createDataGridToggleConnectAction,
  createDataGridClearAction,
  createDataGridResetAction,
} from "./dataGrid";
import { Directions } from "../utils/directions";

describe("datagrid reducer", () => {
  const grid = createDataGrid(2, 2);
  describe("connect cells", () => {
    it("should connect cell", () => {
      const cellId = getIdFromIndex(0, 0);
      const newGrid = dataGridReducer(
        grid,
        createDataGridConnectAction(cellId, Directions.right)
      );
      const newCell = getCellByIndex(newGrid, 0, 0);
      if (newCell == null) {
        expect(newCell).toBeTruthy();
      } else {
        expect(isCellLinked(newCell, Directions.right)).toBe(true);
      }
    });
  });
  describe("disconnect cells", () => {
    it("should disconnect cell", () => {
      const cellId = getIdFromIndex(0, 0);
      const connectedGrid = dataGridReducer(
        grid,
        createDataGridConnectAction(cellId, Directions.right)
      );
      const connectedCell = getCellByIndex(connectedGrid, 0, 0);
      if (connectedCell == null) {
        expect(connectedCell).toBeTruthy();
      } else {
        expect(isCellLinked(connectedCell, Directions.right)).toBe(true);
      }
      const disconnectedGrid = dataGridReducer(
        connectedGrid,
        createDataGridDisconnectAction(cellId, Directions.right)
      );
      const disconnectedCell = getCellByIndex(disconnectedGrid, 0, 0);
      if (disconnectedCell == null) {
        expect(disconnectedCell).toBeTruthy();
      } else {
        expect(isCellLinked(disconnectedCell, Directions.right)).toBe(false);
      }
    });
  });
  describe("toggle connection", () => {
    it("should toggle connection", () => {
      const cellId = getIdFromIndex(0, 0);
      const connectedGrid = dataGridReducer(
        grid,
        createDataGridToggleConnectAction(cellId, Directions.right)
      );
      const connectedCell = getCellByIndex(connectedGrid, 0, 0);
      if (connectedCell == null) {
        expect(connectedCell).toBeTruthy();
      } else {
        expect(isCellLinked(connectedCell, Directions.right)).toBe(true);
      }
      const disconnectedGrid = dataGridReducer(
        connectedGrid,
        createDataGridToggleConnectAction(cellId, Directions.right)
      );
      const disconnectedCell = getCellByIndex(disconnectedGrid, 0, 0);
      if (disconnectedCell == null) {
        expect(disconnectedCell).toBeTruthy();
      } else {
        expect(isCellLinked(disconnectedCell, Directions.right)).toBe(false);
      }
    });
  });
  describe("clear cell", () => {
    it("should clear cell link", () => {
      const cellId = getIdFromIndex(0, 0);
      const connectedGrid1 = dataGridReducer(
        grid,
        createDataGridConnectAction(cellId, Directions.right)
      );
      const connectedGrid2 = dataGridReducer(
        connectedGrid1,
        createDataGridConnectAction(cellId, Directions.down)
      );
      const disconnectedGrid = dataGridReducer(
        connectedGrid2,
        createDataGridClearAction(cellId)
      );
      const disconnectedCell = getCellByIndex(disconnectedGrid, 0, 0);
      if (disconnectedCell == null) {
        expect(disconnectedCell).toBeTruthy();
      } else {
        expect(isCellLinked(disconnectedCell, Directions.right)).toBe(false);
        expect(isCellLinked(disconnectedCell, Directions.down)).toBe(false);
      }
    });
  });
  describe("reset grid", () => {
    it("should reset grid", () => {
      const cellId = getIdFromIndex(0, 0);
      const connectedGrid1 = dataGridReducer(
        grid,
        createDataGridConnectAction(cellId, Directions.right)
      );
      const connectedGrid2 = dataGridReducer(
        connectedGrid1,
        createDataGridConnectAction(cellId, Directions.down)
      );
      const disconnectedGrid = dataGridReducer(
        connectedGrid2,
        createDataGridResetAction()
      );
      const disconnectedCell = getCellByIndex(disconnectedGrid, 0, 0);
      if (disconnectedCell == null) {
        expect(disconnectedCell).toBeTruthy();
      } else {
        expect(isCellLinked(disconnectedCell, Directions.right)).toBe(false);
        expect(isCellLinked(disconnectedCell, Directions.down)).toBe(false);
      }
    });
  });
});
