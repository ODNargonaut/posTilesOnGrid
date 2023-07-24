
// Измеряется все в клетках!
function setCanvasSize(s=null, er=null)
{
  document.getElementById("errNNotDivi").style.display = "none";

  let err = (er==null?{e:OK}:er);

  let idInpNW = document.getElementById("cellNW");
  let idInpNH = document.getElementById("cellNH");

  if (s != null)
  {
    idInpNW.value = settingsCanvas.w;
    idInpNH.value = settingsCanvas.h;
  }

  if (idInpNW.value.trim().length == "") console.log("Error NW: "+(err.e=ELEN));
  if (idInpNH.value.trim().length == "") console.log("Error NH: "+(err.e=ELEN));

  let cellLW = +idInpNW.value;
  let cellLH = +idInpNH.value;

  if (""+cellLW === "NaN") console.log("Error NW: "+(err.e=ENUM));
  if (""+cellLH === "NaN") console.log("Error NH: "+(err.e=ENUM));

  if (err.e === OK)
  {
    if (cellLW % two != zero) console.log("Error W/TWO:"+(err.e=ENOTTWO));
    if (cellLH % two != zero) console.log("Error H/TWO:"+(err.e=ENOTTWO));
  }

  if (err.e === OK)
  {
    settingsCanvas.w = cellLW;
    settingsCanvas.h = cellLH;

    canvasWidth = cellLW * cellSZNotFrame + one;
    canvasHeight = --cellLH * cellSZNotFrame + one;

    canvas.style.width = canvasWidth+"px";
    canvas.style.height = canvasHeight+"px";

    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;

    blockScroll();
    canvasWidthCell = Math.floor(canvasWidth / cellSZNotFrame);
    canvasHeightCell = Math.floor(canvasHeight / cellSZNotFrame);
    setMouseZero();

    if (s == null)
    {
      // перемещаем точки на холсте
      if (settingsCanvas.byDefauld.w < cellLW)
        cellLW -= settingsCanvas.byDefauld.w;
      else if (settingsCanvas.byDefauld.w > cellLW)
        cellLW = (settingsCanvas.byDefauld.w - cellLW) * -1;
      else if (settingsCanvas.byDefauld.w == cellLW)
        cellLW -= settingsCanvas.byDefauld.w;
      
      if (settingsCanvas.byDefauld.h < cellLH)
        cellLH -= settingsCanvas.byDefauld.h;
      else if (settingsCanvas.byDefauld.h > cellLH)
        cellLH = (settingsCanvas.byDefauld.h - cellLH) * -1;
      else if (settingsCanvas.byDefauld.h == cellLH)
        cellLH -= settingsCanvas.byDefauld.h;

        cellLW /= two; cellLH /= two;

      shiftCounterX = cellLW;
      shiftCounterY = cellLH;

      for (let k of palette.tiles.keys())
      {
        let tmpX = palette.tiles.get(k).local.org.x;
        let tmpY = palette.tiles.get(k).local.org.y;
        
        palette.tiles.get(k).local.x = tmpX + shiftCounterX;
        palette.tiles.get(k).local.y = tmpY + shiftCounterY;
      }
    }
  }
  else if (err.e === ENOTTWO)
    document.getElementById("errNNotDivi").style.display = "block";
}