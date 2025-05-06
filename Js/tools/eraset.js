// 
function erasetCur(wx, wy, tmpMap=null)
{
  let key = wx+"|"+wy;
  if (tmpMap != null)
  {
    if (tmpMap.has(key))
      deleteTile("tmpTiles", tmpMap, key);
  }
  else if (tmpMap == null && palette.tiles.get(palette.currentList)[1].has(key))
  {
    addInBuffer({k: key});
    deleteTile("palette", palette.tiles.get(palette.currentList)[1], key);
  }
}

function deleteTile(st, collection, key)
{
  let removeKeyFromGrid = (iCell) => 
  {
    grid.grid[iCell.upperLeftCornerOfGrid.y][iCell.upperLeftCornerOfGrid.x] = "";
  }

  // Сначала удаляем на сетке
  let iCell = collection.get(key)
  if (st == "tmpTiles" && !palette.tiles.get(palette.currentList)[1].has(key) && !rulerObj.point.tmpTiles.has(key))
    removeKeyFromGrid(iCell);
  else if (st == "palette" && !rulerObj.point.tmpTiles.has(key))
    removeKeyFromGrid(iCell);


  // а потом в коллекции
  collection.delete(key);
}