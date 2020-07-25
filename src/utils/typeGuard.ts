export const strHasLength = (str: unknown): str is string =>
  typeof str === "string" && str.length > 0;

export const arrHasLength = <T>(arr: unknown): arr is Array<T> =>
  Array.isArray(arr) && arr.length > 0;
