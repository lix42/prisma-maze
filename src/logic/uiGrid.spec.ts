import { traverseUiGrid, UiGrid, PositionedUiCell } from "./uiGrid";
import { createDataGrid } from "./grid";
import { mapDataToUI } from "./mapDataToUi";

describe("traverseUiGrid", () => {
  let uiGrid: UiGrid;
  beforeEach(() => {
    const dataGrid = createDataGrid(3, 4);
    uiGrid = mapDataToUI(dataGrid);
  });
  it("should traverse every cell in the grid", () => {
    const visited = new Set<string>();
    const visitor = jest.fn().mockImplementation((uiCell: PositionedUiCell) => {
      visited.add(`${uiCell.rowIndex}-${uiCell.columnIndex}`);
    });
    traverseUiGrid(uiGrid, 0, 0, visitor);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 12; j++) {
        const key = `${i}-${j}`;
        if (!visited.has(key)) {
          expect(key).toBeNaN();
        }
      }
    }
  });
  it("should pass the cell to filter before visitor case 0, 0", () => {
    const visitor = jest.fn();
    const filter = jest.fn().mockReturnValue(false);
    traverseUiGrid(uiGrid, 0, 0, visitor, filter);
    expect(visitor).toHaveBeenCalledTimes(1);
    expect(filter).toHaveBeenCalledTimes(2);
  });
  it("should pass the cell to filter before visitor case 0, 1", () => {
    const visitor = jest.fn();
    const filter = jest.fn().mockReturnValue(false);
    traverseUiGrid(uiGrid, 0, 1, visitor, filter);
    expect(visitor).toHaveBeenCalledTimes(1);
    expect(filter).toHaveBeenCalledTimes(3);
  });
});
