canvas.addEventListener('mousemove', MoveBrush, false);
canvas.addEventListener('mouseup', ClickBrush, false);

// Рисуем/стираем плитку в заданной позиции
function ClickBrush() 
{
  if (brush.active && update.active && mouse.itIsAllowedDrawPointAtThisPos)
  {
    if (!ruler.active)
      addOrDelTile();
    else if (continuousBrush.active)
      measureDist();
    else 
      fixPosPoints();
  }
}
function MoveBrush() 
{
  if (continuousBrush.active && update.active && mouse.itIsAllowedDrawPointAtThisPos && !ruler.active)
    addOrDelTile();
}

// 
function addOrDelTile(tmpMap=null, x=null, y=null, wx=null, wy=null)
{
  if (!eraset.active)
  {
    let ULCGx = (x!=null?x:mouse.upperLeftCornerOfGrid.x) + camOffsetULC_X;
    let ULCGy = (y!=null?y:mouse.upperLeftCornerOfGrid.y) + camOffsetULC_Y;

    // Извиняюсь за такое паршивое решение проблемы :(
    // Это мой первый опыт - создания масштабированного эффекта камеры.
    // Не знаю когда, но я исправлю это решение! Клянусь!
    // if (grid.grid[ULCGy] === undefined || grid.grid[ULCGy][ULCGx] === undefined);
    if (1)
    {
      let cell = grid.grid[ULCGy][ULCGx];

      if (cell !== 0 
          && 
          ULCGy < camera.psY.end + camOffsetULC_Y 
          && 
          ULCGx < camera.psX.end + camOffsetULC_X)
      {
        let worldX = (wx!=null?wx:mouse.world.x);
        let worldY = (wy!=null?wy:mouse.world.y);

        let key = worldX+"|"+worldY;
        
        // В момент затирания
        if (tmpMap == null)
          addInBuffer({k: key}, {R: palette.color.R, G: palette.color.G, B: palette.color.B});
        
        (tmpMap!=null?tmpMap:palette.tiles.get(palette.currentList)[1]).set(key,
          {
            keyOnGrid: {x: ULCGx, y: ULCGy},  // чтобы было проще искать ключ на сетке
            pixel: 
            { 
              w: palette.cell.overallSize, 
              h: palette.cell.overallSize, 
              hex: palette.color.current, 
              R: palette.color.R,
              G: palette.color.G,
              B: palette.color.B, 
            },
            upperLeftCornerOfGrid:  // в какой позиции на сетке находится ключ
            { 
              x: ULCGx, y: ULCGy,
              org: {x: ULCGx, y: ULCGy}
            },
            world: { x: worldX, y: worldY },
            obj: 
            {
              N: gridObjs.selected.N,
              ru: 
              {
                title: gridObjs.selected.ru.title,
                descript: gridObjs.selected.ru.descript
              },
              en: 
              {
                title: gridObjs.selected.en.title,
                descript: gridObjs.selected.en.descript
              }
            }
          });

        grid.grid[ULCGy][ULCGx] = key;
      }
    }
  }
  else 
    erasetCur(mouse.world.x, mouse.world.y);
}
