import { Reducer } from "react";
import {
  DataGrid,
  connectCell,
  getCellById,
  disconnectCell,
  isCellLinked,
  createDataGrid,
  getIdFromIndex,
} from "../logic/grid";
import { Directions } from "../utils/directions";
import { generateMaze } from "../logic/generate";

enum DataGridActionType {
  connect = "@@datagrid/connect",
  disconnect = "@@datagrid/disconnect",
  toggleConnection = "@@datagrid/toggle-connection",
  clear = "@@datagrid/clear",
  reset = "@@datagrid/reset",
  constructMaze = "@@datagrid/construct-maze",
}

interface DataGridConnectAction {
  readonly type: DataGridActionType.connect;
  readonly cellId: string;
  readonly direction: Directions;
}

export const createDataGridConnectAction = (
  cellId: string,
  direction: Directions
): DataGridConnectAction => ({
  type: DataGridActionType.connect,
  cellId,
  direction,
});

interface DataGridDisconnectAction {
  readonly type: DataGridActionType.disconnect;
  readonly cellId: string;
  readonly direction: Directions;
}

export const createDataGridDisconnectAction = (
  cellId: string,
  direction: Directions
): DataGridDisconnectAction => ({
  type: DataGridActionType.disconnect,
  cellId,
  direction,
});

interface DataGridClearAction {
  readonly type: DataGridActionType.clear;
  readonly cellId: string;
}

interface DataGridToggleConnectAction {
  readonly type: DataGridActionType.toggleConnection;
  readonly cellId: string;
  readonly direction: Directions;
}

export const createDataGridToggleConnectAction = (
  cellId: string,
  direction: Directions
): DataGridToggleConnectAction => ({
  type: DataGridActionType.toggleConnection,
  cellId,
  direction,
});
export const createDataGridClearAction = (
  cellId: string
): DataGridClearAction => ({
  type: DataGridActionType.clear,
  cellId,
});

interface DataGridResetAction {
  readonly type: DataGridActionType.reset;
}

export const createDataGridResetAction = (): DataGridResetAction => ({
  type: DataGridActionType.reset,
});

interface DataGridConstructMazeAction {
  readonly type: DataGridActionType.constructMaze;
  readonly startRowIndex: number;
  readonly startColumnIndex: number;
  readonly endRowIndex: number;
  readonly endColumnIndex: number;
}

export const createDataGridConstructMazeAction = (
  startRowIndex: number,
  startColumnIndex: number,
  endRowIndex: number,
  endColumnIndex: number
): DataGridConstructMazeAction => ({
  type: DataGridActionType.constructMaze,
  startRowIndex,
  startColumnIndex,
  endRowIndex,
  endColumnIndex,
});

export type DataGridHandledActions =
  | DataGridConnectAction
  | DataGridDisconnectAction
  | DataGridToggleConnectAction
  | DataGridClearAction
  | DataGridResetAction
  | DataGridConstructMazeAction;

const handleConnect = (grid: DataGrid, action: DataGridConnectAction) => {
  const { cellId, direction } = action;
  const cell = getCellById(grid, cellId);
  if (cell == null) {
    return grid;
  }
  return connectCell(grid, cell.rowIndex, cell.columnIndex, direction);
};

const handleDisconnect = (grid: DataGrid, action: DataGridDisconnectAction) => {
  const { cellId, direction } = action;
  const cell = getCellById(grid, cellId);
  if (cell == null) {
    return grid;
  }
  return disconnectCell(grid, cell.rowIndex, cell.columnIndex, direction);
};

const toggleConnection = (
  grid: DataGrid,
  action: DataGridToggleConnectAction
) => {
  const { cellId, direction } = action;
  const cell = getCellById(grid, cellId);
  if (cell == null) {
    return grid;
  }
  if (isCellLinked(cell, direction)) {
    return handleDisconnect(
      grid,
      createDataGridDisconnectAction(cellId, direction)
    );
  } else {
    return handleConnect(grid, createDataGridConnectAction(cellId, direction));
  }
};

const clearCellLink = (
  grid: DataGrid,
  action: DataGridClearAction
): DataGrid => {
  const { cellId } = action;
  return [
    Directions.left,
    Directions.right,
    Directions.up,
    Directions.down,
  ].reduce(
    (previous, direction) =>
      handleDisconnect(
        previous,
        createDataGridDisconnectAction(cellId, direction)
      ),
    grid
  );
};

const resetGrid = (grid: DataGrid, action: DataGridResetAction) => {
  const { width: columCont, height: rowCount } = grid;
  return createDataGrid(rowCount, columCont);
};

const constructMaze = (
  grid: DataGrid,
  action: DataGridConstructMazeAction
): DataGrid => {
  const emptyGrid = resetGrid(grid, createDataGridResetAction());
  const {
    startRowIndex,
    startColumnIndex,
    endRowIndex,
    endColumnIndex,
  } = action;
  const startId = getIdFromIndex(startRowIndex, startColumnIndex);
  const endId = getIdFromIndex(endRowIndex, endColumnIndex);
  const maze = generateMaze(emptyGrid, startId, endId);
  return maze;
};

export const dataGridReducer: Reducer<DataGrid, DataGridHandledActions> = (
  state,
  action
) => {
  console.log(JSON.stringify(action, null, 4));
  switch (action.type) {
    case DataGridActionType.connect:
      return handleConnect(state, action);
    case DataGridActionType.disconnect:
      return handleDisconnect(state, action);
    case DataGridActionType.toggleConnection:
      return toggleConnection(state, action);
    case DataGridActionType.clear:
      return clearCellLink(state, action);
    case DataGridActionType.reset:
      return resetGrid(state, action);
    case DataGridActionType.constructMaze:
      return constructMaze(state, action);
  }
};
