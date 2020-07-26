import { useReducer } from "react";
import { createDataGrid } from "../logic/grid";
import { dataGridReducer } from "../reducer/dataGrid";
import { mapDataToUI } from "../logic/mapDataToUi";

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
  const uiGrid = mapDataToUI(dataGrid);
  return { uiGrid, dispatch };
};

export default useGrid;
