import {
  getRandomColor,
  CellColors,
  CellColorOption,
  decompositionColor,
  compositeColor,
  areColorsRelated,
} from "./cellColors";

describe("getRandomColor", () => {
  it("should return a random color", () => {
    expect(CellColors[getRandomColor()]).toBeTruthy();
  });
});

describe("decompositionColor", () => {
  const DECOMPOSITION_MAP: [CellColorOption, CellColorOption[]][] = [
    [CellColorOption.Red, [CellColorOption.Red]],
    [CellColorOption.Yellow, [CellColorOption.Yellow]],
    [CellColorOption.Blue, [CellColorOption.Blue]],
    [CellColorOption.Orange, [CellColorOption.Red, CellColorOption.Yellow]],
    [CellColorOption.Purple, [CellColorOption.Red, CellColorOption.Blue]],
    [CellColorOption.Green, [CellColorOption.Yellow, CellColorOption.Blue]],
  ];
  DECOMPOSITION_MAP.forEach(([input, result]) => {
    it(`should decomposition ${input}`, () => {
      expect(decompositionColor(input)).toEqual(new Set(result));
    });
  });
});

describe("compositeColor", () => {
  it("should get the same color if only one color is input", () => {
    expect(compositeColor(CellColorOption.Red)).toBe(CellColorOption.Red);
  });
  it("should get the same color if two same colors are input", () => {
    expect(compositeColor(CellColorOption.Red, CellColorOption.Red)).toBe(
      CellColorOption.Red
    );
  });

  it("should composite colors", () => {
    expect(compositeColor(CellColorOption.Red, CellColorOption.Yellow)).toBe(
      CellColorOption.Orange
    );
    expect(compositeColor(CellColorOption.Yellow, CellColorOption.Red)).toBe(
      CellColorOption.Orange
    );
    expect(compositeColor(CellColorOption.Red, CellColorOption.Blue)).toBe(
      CellColorOption.Purple
    );
    expect(compositeColor(CellColorOption.Blue, CellColorOption.Red)).toBe(
      CellColorOption.Purple
    );
    expect(compositeColor(CellColorOption.Yellow, CellColorOption.Blue)).toBe(
      CellColorOption.Green
    );
    expect(compositeColor(CellColorOption.Blue, CellColorOption.Yellow)).toBe(
      CellColorOption.Green
    );
  });
});

describe("areColorsRelated", () => {
  it("should return no for different prime colors", () => {
    expect(areColorsRelated(CellColorOption.Blue, CellColorOption.Red)).toBe(
      false
    );
  });
});
