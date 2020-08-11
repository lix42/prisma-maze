import { useReducer } from "react";
import { createDataGrid } from "../logic/grid";
import { dataGridReducer } from "../reducer/dataGrid";
import { mapDataToUI } from "../logic/mapDataToUi";
import { colorMazeWall } from "../logic/colorUiGrid";
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
  const uiGrid = mapDataToUI(dataGrid, {
    e1RowIndex: 0,
    e1ColumnIndex: 0,
    e2RowIndex: rowCount - 1,
    e2ColumnIndex: 0,
  });
  colorMazeWall(uiGrid);
  return { uiGrid, dispatch, shortestLength };
};

export default useGrid;
