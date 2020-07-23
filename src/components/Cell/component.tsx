import React from "react";
import { cx } from "emotion";
import { cell, top as topStyle, bottom as bottomStyle } from "./style";
import { CellColorOption, CellColor } from "../../hooks/useColor";

interface CellProps {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly color: CellColorOption;
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
