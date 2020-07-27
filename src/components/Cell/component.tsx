import React, { useCallback } from "react";
import { cx } from "emotion";
import { cell, top as topStyle, bottom as bottomStyle } from "./style";
import { CellColors, AllCellColors } from "../../logic/cellColors";

interface CellProps {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly isCurrentRow: boolean;
  readonly color: AllCellColors;
  readonly onClick?: (rowIndex: number, columnIndex: number) => void;
}

export const Cell: React.FC<CellProps> = ({
  rowIndex,
  columnIndex,
  isCurrentRow,
  color,
  onClick,
}) => {
  const direction = (rowIndex + columnIndex) % 2 === 0 ? topStyle : bottomStyle;
  const left = columnIndex * (isCurrentRow ? 101 : 51);
  const clickHandler = useCallback(() => {
    if (typeof onClick === "function") {
      onClick(rowIndex, columnIndex);
    }
  }, [rowIndex, columnIndex, onClick]);
  return (
    <div
      className={cx(cell, CellColors[color], direction)}
      style={{ left }}
      onClick={clickHandler}
    ></div>
  );
};
