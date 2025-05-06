// Проверка размера на ошибки
function checkingGridSize(err, gPsXY=null)
{
  let idInpNW = document.getElementById("cellNW");
  let idInpNH = document.getElementById("cellNH");

  if (gPsXY != null)
  {
    idInpNW.value = gPsXY.w;
    idInpNH.value = gPsXY.h;
  }

  if (idInpNW.value.trim().length == "") console.log("Error NW: "+(err.e=ELEN));
  if (idInpNH.value.trim().length == "") console.log("Error NH: "+(err.e=ELEN));

  let cellWW = +idInpNW.value;
  let cellWH = +idInpNH.value;

  if (""+cellWW === "NaN") console.log("Error NW: "+(err.e=ENUM));
  if (""+cellWH === "NaN") console.log("Error NH: "+(err.e=ENUM));

  if (cellWW % two != zero) console.log("Error W/TWO:"+(err.e=ENOTTWO));
  if (cellWH % two != zero) console.log("Error H/TWO:"+(err.e=ENOTTWO));

  return {ww: cellWW, wh: cellWH};
}


// Измеряется все в клетках!
function setGridSize(check=1)
{
  document.getElementById("errNNotDivi").style.display = "none";

  let err = {e:OK};

  let cell = null;
  switch (check)
  {
    case 1: 
      cell = checkingGridSize(err); 
      break;
    case 0:
      cell = {ww: grid.currentWH.w, wh: grid.currentWH.h};
      break;
  }

  if (err.e === OK)
  {
    if (cell.ww >= camera.w && cell.wh >= camera.h)
    {
      let oldGridW = grid.getW();
      let oldGridH = grid.getH();

      grid.setWH(cell.wh, cell.ww);

      // ===--===
      // При уменьшении/увеличении размера холста, нужно сместить камеру
      
      if (camOffsetULC_X+camera.w > grid.getW())
      {
        let howMuchMore = camOffsetULC_X + camera.w - grid.getW();

        camOffsetULC_X -= howMuchMore;
        camera.offset.upperLeftCorner.x -= camera.newPos() * howMuchMore;
        palette.offset.upperLeftCorner.x += camera.newPos() * howMuchMore;
      }
      else if (oldGridW < grid.getW())
      {
        let howMuchMore = (grid.getW() - oldGridW) / two;

        camOffsetULC_X += howMuchMore;
        camera.offset.upperLeftCorner.x += camera.newPos() * howMuchMore;
        palette.offset.upperLeftCorner.x -= camera.newPos() * howMuchMore;
      }

      if (camOffsetULC_Y+camera.h > grid.getH())
      {
        let howMuchMore = camOffsetULC_Y + camera.h - grid.getH();

        camOffsetULC_Y -= howMuchMore;
        camera.offset.upperLeftCorner.y -= camera.newPos() * howMuchMore;
        palette.offset.upperLeftCorner.y += camera.newPos() * howMuchMore;
      }
      else if (oldGridH < grid.getH())
      {
        let howMuchMore = (grid.getH() - oldGridH) / two;

        camOffsetULC_Y += howMuchMore;
        camera.offset.upperLeftCorner.y += camera.newPos() * howMuchMore;
        palette.offset.upperLeftCorner.y -= camera.newPos() * howMuchMore;
      }
      // ===--===

      let oldZeroX = mouse.zero.x;
      let oldZeroY = mouse.zero.y;
      
      mouse.zero.set();

      let resX = mouse.zero.x - oldZeroX;
      let resY = mouse.zero.y - oldZeroY;

      shiftCounterX += resX;
      shiftCounterY += resY;

      if (!dataImp.active)
      {
        // Смещаем позицию плиток используя их мировые координаты,
        // которые потом мы прибавляем к координатам нуля относительно 
        // верхнего левого угла сетки.
        let zeroICell = {x: zero, y: zero};
        let iCell = palette.tiles.get(palette.currentList)[1].get("0|0");
        
        iCell.upperLeftCornerOfGrid.x = iCell.upperLeftCornerOfGrid.org.x + shiftCounterX;
        iCell.upperLeftCornerOfGrid.y = iCell.upperLeftCornerOfGrid.org.y + shiftCounterY;
        
        iCell.keyOnGrid.x = iCell.upperLeftCornerOfGrid.x;
        iCell.keyOnGrid.y = iCell.upperLeftCornerOfGrid.y;
        
        console.log("shiftCounterX: "+shiftCounterX);
        console.log("shiftCounterY: "+shiftCounterY);
        
        zeroICell.x = iCell.upperLeftCornerOfGrid.x;
        zeroICell.y = iCell.upperLeftCornerOfGrid.y;

        // for (let k of palette.tiles.get(palette.currentList)[1].keys())
        // {
        //   if (k == "0|0") continue;

        //   let iCell = palette.tiles.get(palette.currentList)[1].get(k);

        //   if (zeroICell.x + iCell.world.x < grid.getW())
        //   {
        //     iCell.upperLeftCornerOfGrid.x = zeroICell.x + iCell.world.x;
        //     iCell.keyOnGrid.x = iCell.upperLeftCornerOfGrid.x;
        //   }

        //   if (zeroICell.y + iCell.world.y * -one < grid.getH())
        //   {
        //     iCell.upperLeftCornerOfGrid.y = zeroICell.y + iCell.world.y * -one;
        //     iCell.keyOnGrid.y = iCell.upperLeftCornerOfGrid.y;
        //   }
        // }
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

      grid.currentWH.w = cell.ww;
      grid.currentWH.h = cell.wh;
    }
  }
  else if (err.e === ENOTTWO)
    document.getElementById("errNNotDivi").style.display = "block";
}

/*

[1] ULCGx=58 ULCGy=29 | wx=0 wy=0 | keyOnGrid: x=58 y=29

New:

[1] ULCGx=63 ULCGy=34 | wx=0 wy=0 | keyOnGrid: x=63 y=34

*/