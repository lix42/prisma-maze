import React, { Dispatch, useState, useCallback } from "react";
import { cx } from "emotion";
import { Cell } from "../Cell/component";
import { canvas, controlBar } from "./style";
import {
  DataGridHandledActions,
  createDataGridConstructMazeAction,
} from "../../reducer/dataGrid";
import { UiGrid } from "../../logic/uiGrid";

interface ContainerProps {
  readonly grid: UiGrid;
  readonly dispatch: Dispatch<DataGridHandledActions>;
  readonly shortestLength: number;
}
export const Container: React.FC<ContainerProps> = ({
  grid,
  dispatch,
  shortestLength,
}) => {
  const [offsite, setOffsite] = useState(0);
  const dataGridHeight = Math.ceil(grid.length / 2);
  const uiGridWidth = grid[0].length;
  const height = grid.length * 51;
  const width = grid[0].length * 51 + 50;

  const refreshMaze = useCallback(
    () =>
      dispatch(createDataGridConstructMazeAction(0, 0, dataGridHeight - 1, 0)),
    [dispatch, dataGridHeight]
  );

  const scrollLeft = useCallback(() => {
    let newOffsite = offsite + 2;
    if (newOffsite >= uiGridWidth) {
      newOffsite = 0;
    }
    setOffsite(newOffsite);
  }, [offsite, uiGridWidth]);

  const scrollRight = useCallback(() => {
    let newOffsite = offsite - 2;
    if (newOffsite < 0) {
      newOffsite = uiGridWidth + newOffsite;
    }
    setOffsite(newOffsite);
  }, [offsite, uiGridWidth]);

  return (
    <>
      <div className={cx(canvas)} style={{ width, height }}>
        {grid.flatMap((columns, rowIndex) =>
          columns.map((_, columnIndex) => {
            let cellIndex = columnIndex + offsite;
            if (cellIndex >= uiGridWidth) {
              cellIndex -= uiGridWidth;
            }
            const cell = columns[cellIndex];
            return (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                color={cell.color}
              />
            );
          })
        )}
      </div>
      <div className={cx(controlBar)}>
        <button onClick={refreshMaze}>RefreshMaze Maze</button>
        Shortest Length: {shortestLength}
        <button onClick={scrollLeft}>Scroll Left</button>
        <button
          onClick={() => {
            setOffsite(0);
          }}
        >
          Reset Position
        </button>
        <button onClick={scrollRight}>Scroll Right</button>
      </div>
    </>
  );
};
