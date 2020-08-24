import { css } from "emotion";
import { arrHasLength } from "../utils/typeGuard";

const red = css`
  --cell-color: red;
`;

const yellow = css`
  --cell-color: yellow;
`;

const blue = css`
  --cell-color: blue;
`;

const orange = css`
  --cell-color: orange;
`;

const purple = css`
  --cell-color: purple;
`;

const green = css`
  --cell-color: green;
`;

const transparent = css`
  --cell-color: transparent;
`;

const ends = css`
  --cell-color: black;
`;

export enum CellColorOption {
  Unset = "unset",
  Red = "red",
  Yellow = "yellow",
  Blue = "blue",
  Orange = "orange",
  Purple = "purple",
  Green = "green",
}

export type TransparentColorType = "transparent";
export const transparentColor: TransparentColorType = "transparent";

export type EndsColorType = "ends";

export const endsColor: EndsColorType = "ends";
export type AllCellColors =
  | CellColorOption
  | TransparentColorType
  | EndsColorType;
export const CellColors = Object.freeze({
  [transparentColor]: transparent,
  [endsColor]: ends,
  [CellColorOption.Unset]: transparent,
  [CellColorOption.Red]: red,
  [CellColorOption.Yellow]: yellow,
  [CellColorOption.Blue]: blue,
  [CellColorOption.Orange]: orange,
  [CellColorOption.Purple]: purple,
  [CellColorOption.Green]: green,
});

const allCellColors = Object.values(CellColorOption).filter(
  (c) => c !== CellColorOption.Unset
) as CellColorOption[];
const cellColorsCount = allCellColors.length;

export const getRandomColor = (): CellColorOption => {
  const i = Math.floor(Math.random() * cellColorsCount);
  return allCellColors[i];
};

type PrimaryColor =
  | CellColorOption.Red
  | CellColorOption.Yellow
  | CellColorOption.Blue;

export const getRandomPrimaryColor = (): PrimaryColor => {
  const i = Math.floor(Math.random() * 3);
  return ([
    CellColorOption.Red,
    CellColorOption.Yellow,
    CellColorOption.Blue,
  ] as PrimaryColor[])[i];
};

const DECOMPOSITION_MAP: { [key in CellColorOption]: PrimaryColor[] } = {
  [CellColorOption.Unset]: [],
  [CellColorOption.Red]: [CellColorOption.Red],
  [CellColorOption.Yellow]: [CellColorOption.Yellow],
  [CellColorOption.Blue]: [CellColorOption.Blue],
  [CellColorOption.Orange]: [CellColorOption.Red, CellColorOption.Yellow],
  [CellColorOption.Purple]: [CellColorOption.Red, CellColorOption.Blue],
  [CellColorOption.Green]: [CellColorOption.Yellow, CellColorOption.Blue],
};

export const pickRandomUniqueColor = <S extends AllCellColors>(
  s: Set<S>
): S | null => {
  const list = Array.from(s);
  if (!arrHasLength(list)) {
    return null;
  }
  const listLength = list.length;
  return list[Math.floor(Math.random() * listLength)] ?? null;
};

export const decompositionColor = (color: AllCellColors): Set<PrimaryColor> => {
  if (!isColor(color)) {
    return new Set([getRandomPrimaryColor()]);
  }
  return new Set(DECOMPOSITION_MAP[color]);
};

export const compositeColor = (
  c1: PrimaryColor,
  c2?: PrimaryColor
): CellColorOption => {
  if (c2 == null || c1 === c2) {
    return c1;
  }
  const colorSet = new Set([c1, c2]);
  if (colorSet.has(CellColorOption.Red)) {
    if (colorSet.has(CellColorOption.Blue)) {
      return CellColorOption.Purple;
    }
    return CellColorOption.Orange;
  }
  return CellColorOption.Green;
};

export const isColor = (color: AllCellColors): color is CellColorOption =>
  !(
    color === transparentColor ||
    color === endsColor ||
    color === CellColorOption.Unset
  );
export const areColorsRelated = (
  c1: AllCellColors,
  c2: AllCellColors
): boolean => {
  if (!isColor(c1) || !isColor(c2)) {
    return false;
  }
  const s1 = decompositionColor(c1);
  const s2 = decompositionColor(c2);
  return Array.from(s1.values()).some((c) => s2.has(c));
};
