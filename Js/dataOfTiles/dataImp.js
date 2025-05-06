// 
function dataImport()
{
  document.getElementById("errImpData").style.display = "none";

  let id = document.getElementById("dataForImp");
  let str = id.value.trim();
  id.value = "";
    
  let err = {e:OK};

  let gridWH = "";

  if (str != "")
  {
    let arrData = str.split(' ');

    gridWH = arrData.shift();
    gridWH = gridWH.split('|');

    grid.currentWH.w = +gridWH[0];
    grid.currentWH.h = +gridWH[1];

    // checkingGridSize(err, {w: grid.currentWH.w, h: grid.currentWH.h});

    if (err.e === OK)
    {
      dataImp.active = true;
      palette.tiles.get(palette.currentList)[1].clear();

      for (let i = zero; i < arrData.length; i++)
      {
        // if (arrData[i].indexOf('_') == -1) { err.e = LEVEL2; break; }
        let tmpAr = arrData[i].split('_');
                
        // if (tmpAr[zero].indexOf('|') == -1) { err.e = LEVEL3; break; }
        let coordsXYW = tmpAr[zero].split('|');
                
        // if (tmpAr[one].indexOf('|') == -1) { err.e = LEVEL4; break; }
        let coordsXYL = tmpAr[one].split('|');

        let rgb = tmpAr[two].split('|');
                
        let world = {}, ULCG = {};
                
        world.x = +coordsXYW[zero]; world.y = +coordsXYW[one];
        ULCG.x = +coordsXYL[zero]; ULCG.y = +coordsXYL[one];

        rgb[zero] = +rgb[zero]; rgb[one] = +rgb[one]; rgb[two] = +rgb[two];

        if (""+world.x === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5
        if (""+world.y === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5
        if (""+ULCG.x === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5
        if (""+ULCG.y === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5

        if (""+rgb[zero] === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL6
        if (""+rgb[one]  === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL6
        if (""+rgb[two]  === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL6

        if (err.e!=OK) break;

        let hex = convertRGBToHEX(rgb[0], rgb[1], rgb[2]);

        palette.tiles.get(palette.currentList)[1].set(world.x + "|" + world.y,
          {
            keyOnGrid: {x: ULCG.x, y: ULCG.y},
            pixel: 
            { 
              w: palette.cell.overallSize, 
              h: palette.cell.overallSize, 
              hex: hex,
              R: rgb[zero],
              G: rgb[one],
              B: rgb[two] 
            },
            upperLeftCornerOfGrid: 
            { 
              x: ULCG.x, y: ULCG.y,
              org: {x: ULCG.x, y: ULCG.y} 
            },
            world: { x: world.x, y: world.y }
          });
        }
      }

      // Расставляем ключи плиток на сетке
      for (let k of palette.tiles.get(palette.currentList)[1].keys())
      {
        let iCell = palette.tiles.get(palette.currentList)[1].get(k);    
        
        let ULCGx = iCell.upperLeftCornerOfGrid.x;
        let ULCGy = iCell.upperLeftCornerOfGrid.y;

        let wx = iCell.world.x;
        let wy = iCell.world.y;

        if (ULCGx < grid.getW() && ULCGy < grid.getH())
        {
          grid.grid[ULCGy][ULCGx] = wx+"|"+wy;
        }
      }
      
      // setGridSize(0);

      dataImp.active = false;
    }
  if (err.e != OK)
  {
    document.getElementById("errImpData").style.display = "block";
    console.log("Error: level "+err.e);
  }
}

