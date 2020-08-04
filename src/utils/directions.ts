export enum Directions {
  up = "up",
  right = "right",
  down = "down",
  left = "left",
}

const OPPOSITE_DIRECTION_MAP: {
  readonly [key in Directions]: Directions;
} = {
  [Directions.up]: Directions.down,
  [Directions.right]: Directions.left,
  [Directions.down]: Directions.up,
  [Directions.left]: Directions.right,
};
export const getOppositeDirection = (direction: Directions): Directions =>
  OPPOSITE_DIRECTION_MAP[direction];

const directionsList = Object.values(Directions) as Directions[];
//   [
//   Directions.up,
//   Directions.right,
//   Directions.down,
//   Directions.left,
// ];
export const getRandomDirection = (
  not: Directions | Directions[] = []
): Directions | null => {
  if (!Array.isArray(not)) {
    not = [not];
  }
  const excludeSet = new Set(not);
  if (excludeSet.size >= directionsList.length) {
    return null;
  }
  const candidates = directionsList.filter((d) => !excludeSet.has(d));
  const candidatesCount = candidates.length;
  return candidates[Math.floor(Math.random() * candidatesCount)];
};

export enum UiDirections {
  right,
  up,
  rightAndDown,
  rightAndUp,
}
