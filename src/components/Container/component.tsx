import React, { Dispatch, useState, useCallback } from "react";
import { cx } from "emotion";
import { controlBar } from "./style";
import {
  DataGridHandledActions,
  createDataGridConstructMazeAction,
  createDataGridNoopAction,
} from "../../reducer/dataGrid";
import { UiGrid } from "../../logic/uiGrid";
import { Grid } from "../Grid/grid";

interface ContainerProps {
  readonly grid: UiGrid;
  readonly gridWithPath: UiGrid;
  readonly dispatch: Dispatch<DataGridHandledActions>;
  readonly shortestLength: number;
}
export const Container: React.FC<ContainerProps> = ({
  grid,
  gridWithPath,
  dispatch,
  shortestLength,
}) => {
  const [offset, setOffset] = useState(0);
  const dataGridHeight = Math.ceil(grid.length / 2);
  const uiGridWidth = grid[0].length;
  const height = grid.length * 51;
  const width = grid[0].length * 51 + 50;

  const refreshMaze = useCallback(
    () =>
      dispatch(createDataGridConstructMazeAction(0, 0, dataGridHeight - 1, 0)),
    [dispatch, dataGridHeight]
  );

  const refreshColor = useCallback(() => dispatch(createDataGridNoopAction()), [
    dispatch,
  ]);

  const scrollLeft = useCallback(() => {
    let newOffset = offset + 2;
    if (newOffset >= uiGridWidth) {
      newOffset = 0;
    }
    setOffset(newOffset);
  }, [offset, uiGridWidth]);

  const scrollRight = useCallback(() => {
    let newOffsite = offset - 2;
    if (newOffsite < 0) {
      newOffsite = uiGridWidth + newOffsite;
    }
    setOffset(newOffsite);
  }, [offset, uiGridWidth]);

  return (
    <>
      <Grid
        grid={grid}
        width={width}
        height={height}
        uiGridWidth={uiGridWidth}
        offset={offset}
      />
      <div className={cx(controlBar)}>
        <button onClick={refreshMaze}>Refresh Maze</button>
        <button onClick={refreshColor}>Refresh Color</button>
        Shortest Length: {shortestLength}
        <button onClick={scrollLeft}>Scroll Left</button>
        <button
          onClick={() => {
            setOffset(0);
          }}
        >
          Reset Position
        </button>
        <button onClick={scrollRight}>Scroll Right</button>
      </div>
      <Grid
        grid={gridWithPath}
        width={width}
        height={height}
        uiGridWidth={uiGridWidth}
        offset={offset}
      />
    </>
  );
};
