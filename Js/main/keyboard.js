document.addEventListener("keydown", press, false);
document.addEventListener("keyup", tearOff, false);

// 
function press(e)
{
  if (!saveExpImp.active)
  {
    backgroundColor = "green"

    let modeByArea = document.getElementById("modeA");
    let modeHand = document.getElementById("modeH");
    let modeClrPicker = document.getElementById("modeF");
    let modeSetObject = document.getElementById("modeE");

    if (!dataOutWindow && mouse.onCanvas)
    {
      // ByArea
      if (e.keyCode == byArea.keyCode && !byArea.active && !colorPicker.active 
        && !dragAndDrop.active && !hand.active && !gridObjs.openWindow && !ruler.active)
      {
          byArea.active = true;
          modeByArea.style.backgroundColor = backgroundColor;
      }

      // Hand
      if (e.keyCode == hand.keyCode && !hand.active && update.active && !byArea.active)
      {
        hand.active = true;
        modeHand.style.backgroundColor = backgroundColor;
      }

      // ColorPicker
      if (e.keyCode == colorPicker.keyCode && !colorPicker.active && !dragAndDrop.active
        && !eraset.active && !byArea.active && !brush.active && !continuousBrush.active
        && !setObject.active && !gridObjs.openWindow && !ruler.active)
      {
        modeClrPicker.style.backgroundColor = backgroundColor;
        colorPicker.active = true;
        determineColor();
      }

      // InfoObject
      if (e.keyCode == setObject.keyCode && !setObject.active && !colorPicker.active 
        && !dragAndDrop.active && !eraset.active && !byArea.active && !brush.active 
        && !continuousBrush.active && !ruler.active)
      {
        setObject.active = true;
        modeSetObject.style.backgroundColor = backgroundColor;
        recognizeObj()
      }

      // Buffer
      if (e.keyCode == buffer.keyCode && !buffer.active && update.active 
        && !gridObjs.openWindow && !dragAndDrop.active)
      {
        buffer.active = true;
      }

      // Pause
      if (e.keyCode == pause.keyCode && update.active)
      {
        mouse.posCurActv = false;
      }
    }

    // Esc
    if (e.keyCode == DPTools.keyCode)
    {
      if (!gridObjs.openWindow 
        && !DPTools.data.active && !DPTools.grid.active && !DPTools.add.active && !DPTools.file.active)
      {
        // Скрываем и обнуляем данные полученные линейкой
        document.getElementById("distFixXY").innerHTML = "Вкл: Расстояние/Фиксация точек.";
        if (!ruler.active)
        {
          document.getElementById("blTRuler").style.display = "none";
        }
        clearRuler();
      }

      clsOpnMenu();

      opnClsInfoWindowForObj();

      // При закрытие вкладки, указываем текущие значения
      document.getElementById("cellNW").value = grid.getW();
      document.getElementById("cellNH").value = grid.getH();

      // 
      document.getElementById("fileCommands").style.display = "block";
      document.getElementById("sendingAndResponding").style.display = "none";
      document.getElementById("blFileForSavaData").style.display = "none";
      document.getElementById("errSvNameF").style.display = "none";
      document.getElementById("inpTextFForDt").value = "";
    }
  }
}

// 
function tearOff(e) 
{
  if (!saveExpImp.active)
  {
    backgroundColor = "green"

    let modeBrush = document.getElementById("modeB");
    let modeCBrush = document.getElementById("modeC");
    let modeByArea = document.getElementById("modeA");
    let modeHand = document.getElementById("modeH");
    let modeEraset = document.getElementById("modeD");
    let modeDragAndDrop = document.getElementById("modeShift");
    let modeClrPicker = document.getElementById("modeF");
    let modeSetObject = document.getElementById("modeE");
    let modeRuler = document.getElementById("modeR");

    if (!dataOutWindow || setObject.active) // setObject.active - для устранения визуального 
                                            // бага при открытии окна (т.е. зеленая фон не изчезает при исп. tool)
    {
      // Pause
      if (e.keyCode == pause.keyCode && !update.active)
      {
        pauseON();
      }
      else if (e.keyCode == pause.keyCode && update.active)
      {
        pauseOFF();
      }
    }

    if (!dataOutWindow && mouse.onCanvas || setObject.active) // setObject.active - для устранения визуального бага при 
                                                              // открытии окна (т.е. зеленая фон не изчезает при исп. tool)
    {        
      // Brush
      if (e.keyCode == brush.keyCode && !brush.active && !colorPicker.active && !dragAndDrop.active && !gridObjs.openWindow)
      {
        brush.active = true;
        modeBrush.style.backgroundColor = backgroundColor;
      }
      else if (e.keyCode == brush.keyCode && brush.active)
      {
        brush.active = false;
        modeBrush.style.backgroundColor = "";
      }

      // CountinuousBrush
      if (e.keyCode == continuousBrush.keyCode && !continuousBrush.active && !colorPicker.active
          && !dragAndDrop.active && !gridObjs.openWindow)
      {
        continuousBrush.active = true;
        modeCBrush.style.backgroundColor = backgroundColor;
      }
      else if (e.keyCode == continuousBrush.keyCode && continuousBrush.active)
      {
        continuousBrush.active = false;
        modeCBrush.style.backgroundColor = "";
      }

      // ByArea
      if (e.keyCode == byArea.keyCode && byArea.active)
      {
        addTilesToMainCollection();
        byArea.active = false;
        modeByArea.style.backgroundColor = "";
      }

      // DragAndDrop
      if (e.keyCode == dragAndDrop.keyCode && !dragAndDrop.active && !colorPicker.active
          && !eraset.active && !byArea.active && !continuousBrush.active && !brush.active
          && !setObject.active && !gridObjs.openWindow && !ruler.active
          && mouse.itIsAllowedDrawPointAtThisPos 
          && grid.grid[mouse.upperLeftCornerOfGrid.y+camOffsetULC_Y][mouse.upperLeftCornerOfGrid.x+camOffsetULC_X] !== "")
      {
        dragAndDrop.active = true;
        modeDragAndDrop.style.backgroundColor = backgroundColor;
      }
      else if (e.keyCode == dragAndDrop.keyCode && dragAndDrop.active)
      {
        dragAndDrop.active = false;
        modeDragAndDrop.style.backgroundColor = "";
        fixAndMove();
      }

      // Hand
      if (e.keyCode == hand.keyCode && hand.active)
      {
        hand.active = false;
        modeHand.style.backgroundColor = "";
      }

      // Eraset
      if (e.keyCode === eraset.keyCode && !eraset.active && !colorPicker.active 
        && !dragAndDrop.active && !gridObjs.openWindow && !ruler.active)
      { 
        eraset.active = true;
        modeEraset.style.backgroundColor = backgroundColor;
      }
      else if (e.keyCode == eraset.keyCode && eraset.active)
      {
        eraset.active = false;
        modeEraset.style.backgroundColor = "";
      }
      
      // ColorPicker
      if (e.keyCode == colorPicker.keyCode && colorPicker.active)
      {
        modeClrPicker.style.backgroundColor = "";
        colorPicker.active = false;
      }

      // Ruler
      if (e.keyCode == ruler.keyCode && !ruler.active && !byArea.active && !dragAndDrop.active 
        && !eraset.active && !colorPicker.active && !gridObjs.openWindow)
      {
        modeRuler.style.backgroundColor = backgroundColor;
        ruler.active = true;
        document.getElementById("blTRuler").style.display = "block";
      }
      else if (e.keyCode == ruler.keyCode && ruler.active)
      {
        modeRuler.style.backgroundColor = "";
        ruler.active = false;

        if (!rulerObj.point.end.actv)
        {
          document.getElementById("blTRuler").style.display = "none";
          clearRuler();
        }
      }

      // InfoObject
      if (e.keyCode == setObject.keyCode && setObject.active)
      {
        setObject.active = false;
        modeSetObject.style.backgroundColor = "";
      }

      // Buffer
      if (e.keyCode == buffer.keyCode && buffer.active && update.active)
      {
        stepBack();
        buffer.active = false;
      }
    }
  }
}


let indicator = document.getElementById("ind");
let hint = document.getElementById("hint");
// 
function pauseON()
{
  document.getElementById("hiddenBlock").style.display = "none";
  update.id = setInterval(start, one);
  update.active = true;
  mouse.posCurActv = true;
  indicator.style.backgroundColor = "rgb(5, 255, 5)";
  hint.innerHTML = "";
}

// 
function pauseOFF()
{
  clearInterval(update.id);
  update.active = false;
  indicator.style.backgroundColor = "rgb(255, 21, 0)";
}
