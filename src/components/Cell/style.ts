import { css } from "emotion";

export const cell = css`
  box-sizing: content-box;
  position: absolute;
  width: 0;
  height: 0;
  border: calc(var(--cell-width) / 2) solid transparent;
`;

export const pink = css`
  --cell-color: pink;
`;

export const skyblue = css`
  --cell-color: skyblue;
`;

export const right = css`
  border-left-width: 0;
  border-right-color: var(--cell-color);
`;

export const bottom = css`
  border-top-width: 0;
  border-bottom-color: var(--cell-color);
`;

export const left = css`
  border-right-width: 0;
  border-left-color: var(--cell-color);
`;

export const top = css`
  border-bottom-width: 0;
  border-top-color: var(--cell-color);
`;
