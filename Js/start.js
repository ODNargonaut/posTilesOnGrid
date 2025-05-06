// 
function start()
{
  ctx.clearRect(zero, zero, canvas.width, canvas.height);

  cursorPosOnCanvas();

  // grid.drawGrid();

  for (let y = camera.psY.begin+camOffsetULC_Y; y < camera.psY.end+camOffsetULC_Y; y++)
  {
    for (let x = camera.psX.begin+camOffsetULC_X; x < camera.psX.end+camOffsetULC_X; x++)
    {
      if (y != camera.psY.begin+camOffsetULC_Y && x != camera.psX.begin+camOffsetULC_X)
      {
        // Извиняюсь за такое паршивое решение проблемы :(
        // Это мой первый опыт - создания масштабированного эффекта камеры.
        // Не знаю когда, но я исправлю это решение! Клянусь!
        // if (grid.grid[y] === undefined || grid.grid[y][x] === undefined) continue;
        
        let key = grid.grid[y][x];
        
        drawFillRect(palette.tiles.get(palette.currentList)[1], key, x, y);
        
        if (tmpTiles.size > zero)
          drawFillRect(tmpTiles, key, x, y);

        if (rulerObj.point.tmpTiles.size > zero)
          drawFillRect(rulerObj.point.tmpTiles, key, x, y);

        if (selectedCell.obj.size > zero)
          drawFillRect(selectedCell.obj, key, x, y);
      }
    }
  }
  
  // В разработке: Исправлял баг у инструмента "Рисование по площади".
  // if (byArea.active)
  // {
  //   for (let i = posForSqueeze.counter; i > 0; i--)
  //   {
  //     if (posForSqueeze.end.has(""+posForSqueeze.counter))
  //     {
  //       drawingByArea(false, posForSqueeze.end.get(""+posForSqueeze.counter));
  //       posForSqueeze.end.delete(""+posForSqueeze.counter--);
  //     }
  //   }
  // }

  if (mouse.onCanvas && mouse.posCurActv)
  {
    if (camera.psY.begin < mouse.upperLeftCornerOfGrid.y && mouse.upperLeftCornerOfGrid.y < camera.psY.end 
        && 
        camera.psX.begin < mouse.upperLeftCornerOfGrid.x && mouse.upperLeftCornerOfGrid.x < camera.psX.end)
    {
      mouse.itIsAllowedDrawPointAtThisPos = true;
      ctx.fillStyle = mouse.color;
      ctx.fillRect(
        mouse.upperLeftCornerOfGrid.x * cellSZNotFrame, 
        mouse.upperLeftCornerOfGrid.y * cellSZNotFrame, 
        mouse.w + palette.scale, mouse.h + palette.scale);
    }
    else mouse.itIsAllowedDrawPointAtThisPos = false;
  }
}

// 
function drawFillRect(tmpMap, key, x, y)
{
  if (key !== "" && tmpMap.has(key))
  {
    let iCell = tmpMap.get(key);
    ctx.fillStyle = iCell.pixel.hex;
    ctx.fillRect(
      x * cellSZNotFrame + palette.offset.upperLeftCorner.x,
      y * cellSZNotFrame + palette.offset.upperLeftCorner.y,
      iCell.pixel.w + palette.scale, iCell.pixel.h + palette.scale);
  }
}
