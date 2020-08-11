import { useReducer } from "react";
import { createDataGrid } from "../logic/grid";
import { dataGridReducer } from "../reducer/dataGrid";
import { mapDataToUI } from "../logic/mapDataToUi";
import { colorMazeWall } from "../logic/colorUiGrid";

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
  const uiGrid = mapDataToUI(dataGrid, {
    e1RowIndex: 0,
    e1ColumnIndex: 0,
    e2RowIndex: rowCount - 1,
    e2ColumnIndex: 0,
  });
  colorMazeWall(uiGrid);
  return { uiGrid, dispatch };
};

export default useGrid;
