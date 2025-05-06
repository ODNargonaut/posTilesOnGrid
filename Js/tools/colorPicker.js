
// 
function selectedObj(o)
{
  if (!gridObjs.delLayerGrid)
  {
    idR.value = o.pixel.R;
    idG.value = o.pixel.G;
    idB.value = o.pixel.B;
    idHEX.value = o.pixel.hex;

    setColor("", "-1");

    gridObjs.selected.N = o.obj.N;
        
    gridObjs.selected.ru.title = o.obj.ru.title
    gridObjs.selected.en.title = o.obj.en.title

    if (o.layer)
    {
      document.getElementById("selObj").style.display = "block";
      document.getElementById("selObjN").innerHTML = o.obj.N;
      document.getElementById("currentObjN").innerHTML = gridObjs.selected.N;
      getLayersObj();
    }
  }
  else
  {
    // console.log("Был удален объектный слой: "+o.obj.N);
    gridObjs.delLayerGrid = false;
    getLayersObj();
  }
}

// 
function determineColor()
{
  if (mouse.posCurActv && mouse.itIsAllowedDrawPointAtThisPos)
  {
    let ULCGx = mouse.upperLeftCornerOfGrid.x + camOffsetULC_X;
    let ULCGy = mouse.upperLeftCornerOfGrid.y + camOffsetULC_Y;

    let key = grid.grid[ULCGy][ULCGx];
    if (key != "" && palette.tiles.get(palette.currentList)[1].has(key))
    {
      let iCell = palette.tiles.get(palette.currentList)[1].get(key);

      selectedObj(
        {
          layer: 0,
          pixel: 
          {
            R: iCell.pixel.R, 
            G: iCell.pixel.G, 
            B: iCell.pixel.B, 
            hex: iCell.pixel.hex
          },
          obj:
          {
            N: iCell.obj.N,
            ru: { title: iCell.obj.ru.title },
            en: { title: iCell.obj.en.title }
          }
        }
      );

      gridObjs.selected.ru.descript = iCell.obj.ru.descript
      gridObjs.selected.en.descript = iCell.obj.en.descript
    }
  }
}