import { Reducer } from "react";
import {
  DataGrid,
  connectCell,
  getCellById,
  disconnectCell,
  isCellLinked,
  createDataGrid,
} from "../logic/grid";
import { Directions } from "../utils/directions";

enum DataGridActionType {
  connect = "@@datagrid/connect",
  disconnect = "@@datagrid/disconnect",
  toggleConnection = "@@datagrid/toggle-connection",
  clear = "@@datagrid/clear",
  reset = "@@datagrid/reset",
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

export type DataGridHandledActions =
  | DataGridConnectAction
  | DataGridDisconnectAction
  | DataGridToggleConnectAction
  | DataGridClearAction
  | DataGridResetAction;

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
  }
};
