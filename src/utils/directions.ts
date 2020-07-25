export enum Directions {
  up,
  right,
  down,
  left,
}

const OppositeDirectionMap = {
  [Directions.up]: Directions.down,
  [Directions.right]: Directions.left,
  [Directions.down]: Directions.up,
  [Directions.left]: Directions.right,
};
export const oppositeDirection = (direction: Directions): Directions =>
  OppositeDirectionMap[direction];

export enum UiDirections {
  right,
  up,
  rightAndDown,
  rightAndUp,
}
