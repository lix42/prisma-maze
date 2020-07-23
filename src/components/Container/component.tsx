import React from "react";
import { cx } from "emotion";
import { Cell, CellColorOption } from "../Cell/component";
import { canvas } from "./style";

export const Container: React.FC<{ grid: CellColorOption[][] }> = ({
  grid,
}) => {
  return (
    <div className={cx(canvas)}>
      {grid.flatMap((columns, rowIndex) =>
        columns.map((color, columnIndex) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            color={color}
          />
        ))
      )}
    </div>
  );
};
