
// Распознать объект
function recognizeObj()
{
  if (mouse.posCurActv && mouse.itIsAllowedDrawPointAtThisPos)
  {
    let ULCGx = mouse.upperLeftCornerOfGrid.x + camOffsetULC_X;
    let ULCGy = mouse.upperLeftCornerOfGrid.y + camOffsetULC_Y;

    let key = grid.grid[ULCGy][ULCGx];
    if (key != "" && palette.tiles.get(palette.currentList)[1].has(key))
    {
      let iCell = palette.tiles.get(palette.currentList)[1].get(key);
      gridObjs.obj = iCell;
      opnClsInfoWindowForObj(iCell);

      gridObjs.openWindow = true;
    }
  }
}


// 
function checkObjN(N, err, s="")
{
  if ("" + (+N) === "NaN")
  {
    console.log("Error "+s+": " + (err.e = ENUM));
  }
  if ((""+N).trim().length === 0)
  {
    console.log("Error Len: "+(err.e = ELEN));
  }
  if (+N < 0)
  {
    console.log("Error N < 0: "+(err.e = ELESSTHANZERO));
  }
  if (err.e == OK+ER+EG+EB && gridObjs.listObjs.has(""+N))
  {
    console.log("Error "+s+": " + (err.e = EMORENUM));
  }
}


// 
function setObj()
{
  let N = document.getElementById("inpION").value;

  let err = {e: OK+ER+EG+EB}

  checkObjN(N, err, "ION");

  if (err.e == OK+ER+EG+EB || err.e == EMORENUM) err.e = OK;

  if (err.e == OK && gridObjs.obj != null)
  {
    gridObjs.obj.obj.N = N;

    let titleRu = document.getElementById("inpIOTRu").value.trim();
    let titleEn = document.getElementById("inpIOTEn").value.trim();

    gridObjs.obj.obj.ru.title = titleRu;
    gridObjs.obj.obj.en.title = titleEn;

    let descriptRu = document.getElementById("inpIODescriptRu").value.trim();
    let descriptEn = document.getElementById("inpIODescriptEn").value.trim();

    gridObjs.obj.obj.ru.descript = descriptRu;
    gridObjs.obj.obj.en.descript = descriptEn;
  }
  
  document.getElementById("okIO").style.display = (err.e==OK?"block":"none");
  document.getElementById("errIO").style.display = (err.e==OK?"none":"block")
}


// Open or Close Window
function opnClsInfoWindowForObj(iCell="")
{
  let check = (typeof iCell == 'object');

  document.getElementById("blInfoObj").style.display = (check?"block":"none");

  // RGB
  document.getElementById("inpIOR").value = ""+(check?iCell.pixel.R:"");
  document.getElementById("inpIOG").value = ""+(check?iCell.pixel.G:"");
  document.getElementById("inpIOB").value = ""+(check?iCell.pixel.B:"");

  // XY
  let ULCGx = (check?iCell.keyOnGrid.x:"null");
  let ULCGy = (check?iCell.keyOnGrid.y:"null");
  let wx = (check?iCell.world.x:"null");
  let wy = (check?iCell.world.y:"null");
  document.getElementById("IOPosULCGXY").innerHTML = "ULCG-x: "+ULCGx+" ULCG-y: "+ULCGy;
  document.getElementById("IOPosWorldXY").innerHTML = "World-x: "+wx+" World-y: "+wy;

  // Number
  document.getElementById("inpION").value = (check?iCell.obj.N:"");

  // Title: Ru and En
  document.getElementById("inpIOTRu").value = (check?iCell.obj.ru.title:"");
  document.getElementById("inpIOTEn").value = (check?iCell.obj.en.title:"");

  // Description: Ru and En
  document.getElementById("inpIODescriptRu").value = (check?iCell.obj.ru.descript:"");
  document.getElementById("inpIODescriptEn").value = (check?iCell.obj.en.descript:"");

  // Ok or Error
  document.getElementById("errIO").style.display = "none"
  document.getElementById("okIO").style.display = "none";


  if (!check)
    gridObjs.openWindow = false;
}


// Title on Ru or En
function titleOnRuOrEn(language)
{
  document.getElementById("titleRu").style.display = (language=="ru"?"block":"none");
  document.getElementById("titleEn").style.display = (language=="ru"?"none":"block");
}


// Info on Ru or En
function infoOnRuOrEn(language)
{
  document.getElementById("infoRu").style.display = (language=="ru"?"block":"none");
  document.getElementById("infoEn").style.display = (language=="ru"?"none":"block");
}
