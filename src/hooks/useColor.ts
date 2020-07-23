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
  Transparent = "transparent",
  Pink = "pink",
  Skyblue = "skyblue",
}
export const CellColor = Object.freeze({
  [CellColorOption.Transparent]: transparent,
  [CellColorOption.Pink]: pink,
  [CellColorOption.Skyblue]: skyblue,
});
