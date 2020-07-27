import React, { Dispatch, useCallback, useState } from "react";
import { cx } from "emotion";
import { Cell } from "../Cell/component";
import { canvas, rowContainer } from "./style";
import { UiCell, UiCellType } from "../../logic/mapDataToUi";
import {
  DataGridHandledActions,
  createDataGridClearAction,
  createDataGridToggleConnectAction,
} from "../../reducer/dataGrid";
import { UiDirections, Directions } from "../../utils/directions";

interface ContainerProps {
  readonly grid: UiCell[][];
  readonly dispatch: Dispatch<DataGridHandledActions>;
}
export const Container: React.FC<ContainerProps> = ({ grid, dispatch }) => {
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const onCellClick = useCallback(
    (rowIndex: number, columnIndex: number) => {
      const uiCell = grid[rowIndex][columnIndex];
      if (uiCell.type === UiCellType.Space) {
        const { dataCellId } = uiCell;
        dispatch(createDataGridClearAction(dataCellId));
      } else if (uiCell.type === UiCellType.Link) {
        const { dataCellId, direction: uiDirection } = uiCell;
        if (uiDirection === UiDirections.right) {
          dispatch(
            createDataGridToggleConnectAction(dataCellId, Directions.right)
          );
        } else if (uiDirection === UiDirections.up) {
          dispatch(
            createDataGridToggleConnectAction(dataCellId, Directions.up)
          );
        } else if (uiDirection === UiDirections.rightAndDown) {
          createDataGridToggleConnectAction(dataCellId, Directions.right);
          createDataGridToggleConnectAction(dataCellId, Directions.down);
        } else if (uiDirection === UiDirections.rightAndUp) {
          createDataGridToggleConnectAction(dataCellId, Directions.right);
          createDataGridToggleConnectAction(dataCellId, Directions.up);
        }
      }
    },
    [dispatch, grid]
  );
  const leaveRow = (row: number) => {
    if (row === currentRow) {
      setCurrentRow(null);
    }
  };
  const enterRow = (row: number) => {
    if (row !== currentRow) {
      setCurrentRow(row);
    }
  };

  const height = grid.length * 51;
  const width =
    currentRow == null ? grid[0].length * 51 + 50 : grid[0].length * 101;

  return (
    <div className={cx(canvas)} style={{ width, height }}>
      {grid.map((columns, rowIndex) => (
        <div
          className={cx(rowContainer)}
          onMouseEnter={() => enterRow(rowIndex)}
          onMouseLeave={() => leaveRow(rowIndex)}
        >
          {columns.map(({ color }, columnIndex) => (
            <Cell
              key={`${rowIndex}-${columnIndex}`}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              isCurrentRow={rowIndex === currentRow}
              color={color}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
