import React from "react";
import { cx } from "emotion";
import {
  cell,
  top as topStyle,
  bottom as bottomStyle,
  pink,
  skyblue,
} from "./style";

export const CellColor = Object.freeze({
  Pink: pink,
  Skyblue: skyblue,
});

export type CellColorOption = keyof typeof CellColor;

interface CellProps {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly color: keyof typeof CellColor;
}

export const Cell: React.FC<CellProps> = ({ rowIndex, columnIndex, color }) => {
  const direction = (rowIndex + columnIndex) % 2 === 0 ? topStyle : bottomStyle;
  const top = rowIndex * 51;
  const left = columnIndex * 51;
  return (
    <div
      className={cx(cell, CellColor[color], direction)}
      style={{ top, left }}
    ></div>
  );
};
