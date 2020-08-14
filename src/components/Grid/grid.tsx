import React from "react";
import { UiGrid } from "../../logic/uiGrid";
import { canvas } from "./style";
import { cx } from "emotion";
import { Cell } from "../Cell";
interface GridProps {
  readonly grid: UiGrid;
  readonly offset: number;
  readonly uiGridWidth: number;
  readonly width: number;
  readonly height: number;
}

export const Grid: React.FC<GridProps> = ({
  grid,
  uiGridWidth,
  width,
  height,
  offset,
}) => (
  <div className={cx(canvas)} style={{ width, height }}>
    {grid.flatMap((columns, rowIndex) =>
      columns.map((_, columnIndex) => {
        let cellIndex = columnIndex + offset;
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
);
