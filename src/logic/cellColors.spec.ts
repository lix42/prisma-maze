import { getRandomColor, CellColors } from "./cellColors";

describe("getRandomColor", () => {
  it("should return a random color", () => {
    expect(CellColors[getRandomColor()]).toBeTruthy();
  });
});
