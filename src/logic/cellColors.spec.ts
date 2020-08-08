import {
  getRandomColor,
  CellColors,
  CellColorOption,
  decompositionColor,
  compositeColor,
} from "./cellColors";

describe("getRandomColor", () => {
  it("should return a random color", () => {
    expect(CellColors[getRandomColor()]).toBeTruthy();
  });
});

describe("decompositionColor", () => {
  const DECOMPOSITION_MAP: [CellColorOption, CellColorOption[]][] = [
    [CellColorOption.Red, [CellColorOption.Red]],
    [CellColorOption.Green, [CellColorOption.Green]],
    [CellColorOption.Blue, [CellColorOption.Blue]],
    [CellColorOption.Yellow, [CellColorOption.Red, CellColorOption.Green]],
    [CellColorOption.Magenta, [CellColorOption.Red, CellColorOption.Blue]],
    [CellColorOption.Cyan, [CellColorOption.Green, CellColorOption.Blue]],
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
    expect(compositeColor(CellColorOption.Red, CellColorOption.Green)).toBe(
      CellColorOption.Yellow
    );
    expect(compositeColor(CellColorOption.Green, CellColorOption.Red)).toBe(
      CellColorOption.Yellow
    );
    expect(compositeColor(CellColorOption.Red, CellColorOption.Blue)).toBe(
      CellColorOption.Magenta
    );
    expect(compositeColor(CellColorOption.Blue, CellColorOption.Red)).toBe(
      CellColorOption.Magenta
    );
    expect(compositeColor(CellColorOption.Green, CellColorOption.Blue)).toBe(
      CellColorOption.Cyan
    );
    expect(compositeColor(CellColorOption.Blue, CellColorOption.Green)).toBe(
      CellColorOption.Cyan
    );
  });
});
