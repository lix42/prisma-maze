import { css } from "emotion";

const pink = css`
  --cell-color: pink;
`;

const skyblue = css`
  --cell-color: skyblue;
`;

const transparent = css`
  --cell-color: transparent;
`;

export enum CellColorOption {
  Pink = "pink",
  Skyblue = "skyblue",
}

export type TransparentColorType = "transparent";
export const transparentColor: TransparentColorType = "transparent";
export type AllCellColors = CellColorOption | TransparentColorType;
export const CellColors = Object.freeze({
  [transparentColor]: transparent,
  [CellColorOption.Pink]: pink,
  [CellColorOption.Skyblue]: skyblue,
});

const allCellColors = Object.values(CellColorOption) as CellColorOption[];
const cellColorsCount = allCellColors.length;

export const getRandomColor = (): CellColorOption => {
  const i = Math.floor(Math.random() * cellColorsCount);
  return allCellColors[i];
};
