
// 
let selectedCell = 
{
  obj: new Map(),
  keys: [],
  values: [], 
  actv: false
};

// 
function fixAndMove()
{
  if (!mouse.itIsAllowedDrawPointAtThisPos)
  {
    dragAndDrop.active = false;
    document.getElementById("modeShift").style.backgroundColor = "";
  }

  if (dragAndDrop.active)
  {
    let ULCGx = mouse.upperLeftCornerOfGrid.x + camOffsetULC_X;
    let ULCGy = mouse.upperLeftCornerOfGrid.y + camOffsetULC_Y;

    let worldX = mouse.world.x;
    let worldY = mouse.world.y;

    if (!selectedCell.actv)
    {
      let key = grid.grid[ULCGy][ULCGx];
    
      if (key !== "" && palette.tiles.get(palette.currentList)[1].has(key))
      {
        selectedCell.keys.push(key);
        selectedCell.values.push(cloneObj(palette.tiles.get(palette.currentList)[1].get(key)));
        selectedCell.obj.set(selectedCell.keys[0], selectedCell.values[0]);

        addInBuffer({k: key});

        palette.tiles.get(palette.currentList)[1].delete(key);

        selectedCell.actv = true;
        grid.grid[ULCGy][ULCGx] = "";

        mouse.color = selectedCell.values[0].pixel.hex;  // меняем цвет курсора на цвет выбранной плитки
      }
    }
    else
    {
      if (grid.grid[ULCGy][ULCGx] !== 0)
      {
        selectedCell.obj.clear();

        let key = worldX+"|"+worldY;

        selectedCell.keys[0] = key;
        let k = selectedCell.keys[0];
        let v = selectedCell.values[0];

        let oldULCGx = v.keyOnGrid.x;
        let oldULCGy = v.keyOnGrid.y;
        let oldWorldx = v.world.x;
        let oldWorldy = v.world.y;

        v.keyOnGrid.x = ULCGx;
        v.keyOnGrid.y = ULCGy;
        v.upperLeftCornerOfGrid.x = ULCGx;
        v.upperLeftCornerOfGrid.y = ULCGy;
        v.world.x = worldX;
        v.world.y = worldY;

        selectedCell.obj.set(k, v);

        if (!palette.tiles.get(palette.currentList)[1].has(oldWorldx+"|"+oldWorldy))
          grid.grid[oldULCGy][oldULCGx] = "";
        
        grid.grid[ULCGy][ULCGx] = key;
      }
    }
  }
  else 
  {
    if (selectedCell.obj.size > zero)
    {
      let k = selectedCell.keys[0];
      let v = selectedCell.values[0];

      addInBuffer({k: k});
      palette.tiles.get(palette.currentList)[1].set(k, v);

      dragAndDrop.active = true;
      addInBuffer({k: k});
      dragAndDrop.active = false;

      selectedCell.obj.clear();
      selectedCell.keys = [];
      selectedCell.values = [];
      selectedCell.actv = false;

      mouse.color = mouse.colorByDefault;
    }
  }
}

// 
function cloneObj(obj)
{
  if (typeof obj == 'object')
  {
    let ULCGx = obj.upperLeftCornerOfGrid.x;
    let ULCGy = obj.upperLeftCornerOfGrid.y;
    let ULCGorgx = obj.upperLeftCornerOfGrid.org.x;
    let ULCGorgy = obj.upperLeftCornerOfGrid.org.y;

    return {
      keyOnGrid: {x: obj.keyOnGrid.x, y: obj.keyOnGrid.y},
      pixel: 
      { 
        w: obj.pixel.w, 
        h: obj.pixel.h, 
        hex: obj.pixel.hex, 
        R: obj.pixel.R,
        G: obj.pixel.G,
        B: obj.pixel.B, 
      },
      upperLeftCornerOfGrid:  // в какой позиции на сетке находится ключ
      { 
        x: ULCGx, y: ULCGy,
        org: {x: ULCGorgx, y: ULCGorgy}
      },
      world: { x: obj.world.x, y: obj.world.y },
      obj: 
      {
        N: obj.obj.N,
        ru: 
        {
          title: obj.obj.ru.title,
          descript: obj.obj.ru.descript
        },
        en: 
        {
          title: obj.obj.en.title,
          descript: obj.obj.en.descript
        }
      }
    };
  }
}
