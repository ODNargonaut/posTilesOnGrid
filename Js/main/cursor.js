canvas.addEventListener('mousemove', MoveMousePos, false);

let not = false;
// 
function cursorOnCanvas(active) 
{
    mouse.onCanvas = active;

    if (!mouse.onCanvas)
    {
      hand.active = false;
      document.getElementById("modeH").style.backgroundColor = "";
    }
}

// DP - Down Panel
function cursorOnDP(s, active) 
{
  switch(s)
  {
    case "data": DPTools.data.active = active; break;
    case "grid": DPTools.grid.active = active; break;
    case "add":  DPTools.add.active  = active; break;
    case "save": DPTools.save.active = active; break;
  }
}

// 
function cnvEPage(e, axis) 
{
    if (axis == "X")
        return e.pageX - e.target.offsetLeft;
    else if (axis == "Y")
        return e.pageY - e.target.offsetTop;
}

// Отслеживаем pos курсора на странице
function MoveMousePos(e) 
{
  // $('#canvas').on('mouseover', cursorOnCanvas(true));
  // $('#canvas').on('mouseout', cursorOnCanvas(false));

  let psX = cnvEPage(e, "X");
  let psY = cnvEPage(e, "Y");

  mouse.upperLeftCornerOfGrid.x = Math.floor(psX / cellSZNotFrame);
  mouse.upperLeftCornerOfGrid.y = Math.floor(psY / cellSZNotFrame);

  mouse.world.x = mouse.upperLeftCornerOfGrid.x - mouse.zero.x + camOffsetULC_X;
  mouse.world.y = -(mouse.upperLeftCornerOfGrid.y - mouse.zero.y)-camOffsetULC_Y;

  let ULCGx = mouse.upperLeftCornerOfGrid.x;
  let ULCGy = mouse.upperLeftCornerOfGrid.y;

  handCur(ULCGx, ULCGy);

  if (!hand.active && update.active && mouse.itIsAllowedDrawPointAtThisPos)
  {
    drawingByArea();
  }
  
  if (dragAndDrop.active) fixAndMove();
}

// Предоставить координаты мыши по ULCG и World
function getPosULCGAndWorldMouse()
{
  let ULCGx = mouse.upperLeftCornerOfGrid.x;
  let ULCGy = mouse.upperLeftCornerOfGrid.y;
  let Worldx = mouse.world.x;
  let Worldy = mouse.world.y;

  return {ULCGx:ULCGx, ULCGy:ULCGy, Worldx:Worldx, Worldy:Worldy}
}

// Позиция курсора на холсте
function cursorPosOnCanvas()
{
  let x = "X: "; let y = " Y: ";
    
  if (mouse.onCanvas && mouse.posCurActv)
  {
    if (camera.psY.begin < mouse.upperLeftCornerOfGrid.y && mouse.upperLeftCornerOfGrid.y < camera.psY.end 
        && 
        camera.psX.begin < mouse.upperLeftCornerOfGrid.x && mouse.upperLeftCornerOfGrid.x < camera.psX.end)
    {
      x += mouse.world.x;
      y += mouse.world.y;
    }
    else 
    {
      x += "null";
      y += "null";
    }
  }
  else 
  {
    x += "null";
    y += "null";
  }

  document.getElementById("psX").innerHTML = x;
  document.getElementById("psY").innerHTML = y;
}
