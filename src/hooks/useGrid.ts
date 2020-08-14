import { useReducer } from "react";
import { createDataGrid } from "../logic/grid";
import { dataGridReducer } from "../reducer/dataGrid";
import { mapDataToUI, mapPathToUiIndex } from "../logic/mapDataToUi";
import { colorMazeWall, colorMazePath } from "../logic/colorUiGrid";
import { shortestPathFromIndex } from "../logic/resolve";

const initGrid = ({
  rowCount,
  columnCount,
}: {
  rowCount: number;
  columnCount: number;
}) => createDataGrid(rowCount, columnCount);

const useGrid = (rowCount: number, columnCount: number) => {
  const [dataGrid, dispatch] = useReducer(
    dataGridReducer,
    { rowCount, columnCount },
    initGrid
  );
  const shortestPath = shortestPathFromIndex(dataGrid, 0, 0, rowCount - 1, 0);
  const shortestLength = shortestPath != null ? shortestPath.length : 0;
  const mazyWall = mapDataToUI(dataGrid, {
    e1RowIndex: 0,
    e1ColumnIndex: 0,
    e2RowIndex: rowCount - 1,
    e2ColumnIndex: 0,
  });
  colorMazeWall(mazyWall);
  const cellOnPath =
    shortestPath != null ? mapPathToUiIndex(dataGrid, shortestPath) : null;
  const mazyPath = mapDataToUI(dataGrid, {
    e1RowIndex: 0,
    e1ColumnIndex: 0,
    e2RowIndex: rowCount - 1,
    e2ColumnIndex: 0,
  });
  colorMazePath(mazyPath, cellOnPath);
  return {
    uiGrid: mazyWall,
    uiGirdWithPath: mazyPath,
    dispatch,
    shortestLength,
  };
};

export default useGrid;
