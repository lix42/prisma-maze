import React from "react";
import { cx } from "emotion";
import "./Cell.css";

interface CellProps {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly color: string;
}

const Cell: React.FC<CellProps> = ({ rowIndex, columnIndex, color }) => {
  const direction = (rowIndex + columnIndex) % 2 === 0 ? "top" : "bottom";
  const top = rowIndex * 50;
  const left = columnIndex * 50;
  return (
    <div className={cx("cell", color, direction)} style={{ top, left }}></div>
  );
};

export default Cell;
