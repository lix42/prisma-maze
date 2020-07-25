import { createDataGrid, DataGrid, connectCell } from "./grid";
import { isCellFilled, mapDataToUI } from "./mapDataToUi";
import { Directions } from "../utils/directions";

describe("mapDataToUi", () => {
  const source = createDataGrid(2, 2);
  const mapUiGrid = (dataGrid: DataGrid) => {
    const uiGrid = mapDataToUI(source);
    return uiGrid.map((row) => row.map((cell) => isCellFilled(cell, dataGrid)));
  };
  it("should map disconnected grid to UI", () => {
    expect(mapUiGrid(source)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          true,
          true,
          false,
          true,
          true,
        ],
        Array [
          true,
          true,
          true,
          true,
          true,
          true,
        ],
        Array [
          false,
          true,
          true,
          false,
          true,
          true,
        ],
      ]
    `);
  });
  it("should map half connected grid to UI", () => {
    const grid1 = connectCell(source, 0, 0, Directions.right);
    const grid2 = connectCell(grid1, 0, 0, Directions.down);
    const grid3 = connectCell(grid2, 1, 1, Directions.left);
    const grid4 = connectCell(grid3, 1, 1, Directions.up);
    expect(mapUiGrid(grid4)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          false,
          false,
          false,
          true,
          true,
        ],
        Array [
          false,
          false,
          true,
          false,
          false,
          true,
        ],
        Array [
          false,
          false,
          false,
          false,
          false,
          true,
        ],
      ]
    `);
  });
  it("should map all connected grid to UI", () => {
    const grid1 = connectCell(source, 0, 0, Directions.right);
    const grid2 = connectCell(grid1, 0, 0, Directions.down);
    const grid3 = connectCell(grid2, 1, 1, Directions.left);
    const grid4 = connectCell(grid3, 1, 1, Directions.up);
    const grid5 = connectCell(grid4, 0, 1, Directions.right);
    const grid6 = connectCell(grid5, 1, 1, Directions.right);
    expect(mapUiGrid(grid6)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        Array [
          false,
          false,
          true,
          false,
          false,
          true,
        ],
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ]
    `);
  });
  it("should map horizontal connected grid to UI", () => {
    const grid1 = connectCell(source, 0, 0, Directions.right);
    const grid2 = connectCell(grid1, 1, 0, Directions.right);
    const grid3 = connectCell(grid2, 0, 1, Directions.right);
    const grid4 = connectCell(grid3, 1, 1, Directions.right);
    expect(mapUiGrid(grid4)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        Array [
          true,
          true,
          true,
          true,
          true,
          true,
        ],
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ]
    `);
  });
  it("should map vertical connected grid to UI", () => {
    const grid1 = connectCell(source, 0, 0, Directions.down);
    const grid2 = connectCell(grid1, 0, 1, Directions.down);
    expect(mapUiGrid(grid2)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          false,
          true,
          false,
          true,
          true,
        ],
        Array [
          false,
          false,
          true,
          false,
          false,
          true,
        ],
        Array [
          false,
          true,
          true,
          false,
          false,
          true,
        ],
      ]
    `);
  });
  it("should map T connected grid to UI", () => {
    const grid1 = connectCell(source, 0, 0, Directions.down);
    const grid2 = connectCell(grid1, 0, 0, Directions.left);
    const grid3 = connectCell(grid2, 0, 0, Directions.right);
    expect(mapUiGrid(grid3)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        Array [
          false,
          false,
          true,
          true,
          true,
          true,
        ],
        Array [
          false,
          true,
          true,
          false,
          true,
          true,
        ],
      ]
    `);
  });
  it("should map reverse T connected grid to UI", () => {
    const grid1 = connectCell(source, 1, 1, Directions.up);
    const grid2 = connectCell(grid1, 1, 1, Directions.left);
    const grid3 = connectCell(grid2, 1, 1, Directions.right);
    expect(mapUiGrid(grid3)).toMatchInlineSnapshot(`
      Array [
        Array [
          false,
          true,
          true,
          false,
          true,
          true,
        ],
        Array [
          true,
          true,
          true,
          false,
          false,
          true,
        ],
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ]
    `);
  });
});
