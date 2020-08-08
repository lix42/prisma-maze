import { css } from "emotion";

const red = css`
  --cell-color: rgb(200, 100, 100);
`;

const green = css`
  --cell-color: rgb(100, 200, 100);
`;

const blue = css`
  --cell-color: rgb(100, 100, 200);
`;

const yellow = css`
  --cell-color: rgb(220, 220, 10);
`;

const magenta = css`
  --cell-color: rgb(220, 10, 220);
`;

const cyan = css`
  --cell-color: rgb(10, 220, 220);
`;

const transparent = css`
  --cell-color: transparent;
`;

export enum CellColorOption {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
  Magenta = "magenta",
  Cyan = "cyan",
}

export type TransparentColorType = "transparent";
export const transparentColor: TransparentColorType = "transparent";
export type AllCellColors = CellColorOption | TransparentColorType;
export const CellColors = Object.freeze({
  [transparentColor]: transparent,
  [CellColorOption.Red]: red,
  [CellColorOption.Green]: green,
  [CellColorOption.Blue]: blue,
  [CellColorOption.Yellow]: yellow,
  [CellColorOption.Magenta]: magenta,
  [CellColorOption.Cyan]: cyan,
});

const allCellColors = Object.values(CellColorOption) as CellColorOption[];
const cellColorsCount = allCellColors.length;

export const getRandomColor = (): CellColorOption => {
  const i = Math.floor(Math.random() * cellColorsCount);
  return allCellColors[i];
};

type PrimaryColor =
  | CellColorOption.Red
  | CellColorOption.Green
  | CellColorOption.Blue;

export const getRandomPrimaryColor = (): PrimaryColor => {
  const i = Math.floor(Math.random() * 3);
  return ([
    CellColorOption.Red,
    CellColorOption.Green,
    CellColorOption.Blue,
  ] as PrimaryColor[])[i];
};

const DECOMPOSITION_MAP: { [key in CellColorOption]: PrimaryColor[] } = {
  [CellColorOption.Red]: [CellColorOption.Red],
  [CellColorOption.Green]: [CellColorOption.Green],
  [CellColorOption.Blue]: [CellColorOption.Blue],
  [CellColorOption.Yellow]: [CellColorOption.Red, CellColorOption.Green],
  [CellColorOption.Magenta]: [CellColorOption.Red, CellColorOption.Blue],
  [CellColorOption.Cyan]: [CellColorOption.Green, CellColorOption.Blue],
};

export const decompositionColor = (
  color: CellColorOption
): Set<PrimaryColor> => {
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
      return CellColorOption.Magenta;
    }
    return CellColorOption.Yellow;
  }
  return CellColorOption.Cyan;
};
