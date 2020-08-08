import React, { useCallback } from "react";
import { cx } from "emotion";
import { cell, top as topStyle, bottom as bottomStyle } from "./style";
import { CellColors, AllCellColors } from "../../logic/cellColors";

interface CellProps {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly color: AllCellColors;
  readonly onClick?: (rowIndex: number, columnIndex: number) => void;
}

export const Cell: React.FC<CellProps> = ({
  rowIndex,
  columnIndex,
  color,
  onClick,
}) => {
  const direction = (rowIndex + columnIndex) % 2 === 0 ? topStyle : bottomStyle;
  const top = rowIndex * 51;
  const left = columnIndex * 51;
  const clickHandler = useCallback(() => {
    if (typeof onClick === "function") {
      onClick(rowIndex, columnIndex);
    }
  }, [rowIndex, columnIndex, onClick]);
  return (
    <div
      className={cx(cell, CellColors[color], direction)}
      style={{ top, left }}
      onClick={clickHandler}
    ></div>
  );
};
