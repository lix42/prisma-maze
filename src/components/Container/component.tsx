import React, { Dispatch } from "react";
import { cx } from "emotion";
import { Cell } from "../Cell/component";
import { canvas } from "./style";
import { UiCell } from "../../logic/mapDataToUi";
import {
  DataGridHandledActions,
  createDataGridConstructMazeAction,
} from "../../reducer/dataGrid";

interface ContainerProps {
  readonly grid: UiCell[][];
  readonly dispatch: Dispatch<DataGridHandledActions>;
}
export const Container: React.FC<ContainerProps> = ({ grid, dispatch }) => {
  const height = grid.length * 51;
  const width = grid[0].length * 51 + 50;

  return (
    <>
      <div className={cx(canvas)} style={{ width, height }}>
        {grid.flatMap((columns, rowIndex) =>
          columns.map(({ color }, columnIndex) => (
            <Cell
              key={`${rowIndex}-${columnIndex}`}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              color={color}
            />
          ))
        )}
      </div>
      <button
        onClick={() => dispatch(createDataGridConstructMazeAction(0, 0, 2, 0))}
      >
        Create Maze
      </button>
    </>
  );
};
