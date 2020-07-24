export enum Directions {
  up,
  right,
  down,
  left,
}
export type DataCell = {
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly links: {
    [Directions.up]?: DataCell;
    [Directions.right]?: DataCell;
    [Directions.down]?: DataCell;
    [Directions.left]?: DataCell;
  };
};

const OppositeDirectionMap = {
  [Directions.up]: Directions.down,
  [Directions.right]: Directions.left,
  [Directions.down]: Directions.up,
  [Directions.left]: Directions.right,
};
const oppositeDirection = (direction: Directions): Directions =>
  OppositeDirectionMap[direction];

const connectDataCell = (c1: DataCell, c2: DataCell, direction: Directions) => {
  const opposite = oppositeDirection(direction);

  if (c1.links[direction] === c2 && c2.links[opposite] === c1) {
    return;
  }
  const c1Another = c1.links[direction];
  if (c1Another != null) {
    c1Another.links[opposite] = undefined;
  }
  const c2Another = c2.links[opposite];
  if (c2Another != null) {
    c2Another.links[direction] = undefined;
  }
  c1.links[direction] = c2;
  c2.links[opposite] = c1;
};

export class DataGrid {
  constructor(rowCount: number, columnCount: number) {
    this._data = new Array(rowCount).fill([]).map((_) => []);
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        this._data[rowIndex][columnIndex] = {
          rowIndex,
          columnIndex,
          links: {},
        };
      }
    }
  }

  get(
    rowIndex: number,
    columnIndex: number,
    direction?: Directions
  ): DataCell | null {
    if (direction == null) {
      if (rowIndex < 0 || rowIndex >= this._data.length) {
        return null;
      }
      const columnCount = this._data[rowIndex].length;
      columnIndex = columnIndex % columnCount;
      if (columnIndex < 0) {
        columnIndex = columnCount + columnIndex;
      }
      return this._data[rowIndex][columnIndex];
    }
    switch (direction) {
      case Directions.up:
        return this.get(rowIndex - 1, columnIndex);
      case Directions.down:
        return this.get(rowIndex + 1, columnIndex);
      case Directions.left:
        return this.get(rowIndex, columnIndex - 1);
      case Directions.right:
        return this.get(rowIndex, columnIndex + 1);
    }
  }

  connect(rowIndex: number, columnIndex: number, direction: Directions) {
    const c1 = this.get(rowIndex, columnIndex);
    const c2 = this.get(rowIndex, columnIndex, direction);
    if (c1 == null || c2 == null) {
      return;
    }
    return connectDataCell(c1, c2, direction);
  }
  private _data: DataCell[][];
}
