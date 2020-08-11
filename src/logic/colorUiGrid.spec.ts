import { colorMazeWall } from "./colorUiGrid";
import { createDataGrid, getIdFromIndex } from "./grid";
import { mapDataToUI } from "./mapDataToUi";
import { UiGrid, UiCellType } from "./uiGrid";
import { CellColorOption } from "./cellColors";
import { generateMaze } from "./generate";

describe("colorMazeWall", () => {
  it("should set color for all wall cell", () => {
    const dataGrid = createDataGrid(3, 4);
    const uiGrid = mapDataToUI(dataGrid);
    colorMazeWall(uiGrid);
    for (let ri = 0; ri < uiGrid.length; ri++) {
      for (let ci = 0; ci < uiGrid[0].length; ci++) {
        if (uiGrid[ri][ci].color === CellColorOption.Unset) {
          expect(`${ri}-${ci}`).toBeNaN();
        }
      }
    }
  });
  it("should set color for maze wall cell", () => {
    const dataGrid = createDataGrid(3, 4);
    const maze = generateMaze(
      dataGrid,
      getIdFromIndex(0, 0),
      getIdFromIndex(3, 0)
    );
    const uiGrid = mapDataToUI(maze);
    colorMazeWall(uiGrid);
    for (let ri = 0; ri < uiGrid.length; ri++) {
      for (let ci = 0; ci < uiGrid[0].length; ci++) {
        if (uiGrid[ri][ci].color === CellColorOption.Unset) {
          expect(`${ri}-${ci}`).toBeNaN();
        }
      }
    }
  });
});
