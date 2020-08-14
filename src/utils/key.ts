export const indexToKey = (
  rowIndex: number,
  columnIndex: number,
  width: number
) => {
  columnIndex = columnIndex % width;
  if (columnIndex < 0) {
    columnIndex += width;
  }
  return `${rowIndex}-${columnIndex}`;
};
