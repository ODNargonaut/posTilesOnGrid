// 
function addInBuffer(Obj, colorNext=null)
{
  if (palette.tiles.get(palette.currentList)[1].has(Obj.k))
  {
    buffer.clone = false;
    let BUFSIZE = buffer.size.current();
    let obj = { k: Obj.k, v: cloneObj(palette.tiles.get(palette.currentList)[1].get(Obj.k)) };

    if (!eraset.active && !dragAndDrop.active)
    {
      let conditions = (n) => 
      {
        let opn = null;

        // Это условия нужно для подавления клонов
        if (n == one && BUFSIZE > 0 && Obj.k == buffer.objs.get(palette.currentList)[BUFSIZE-1].o.k)
        {
          opn = [buffer.objs.get(palette.currentList)[BUFSIZE-1].o.v.pixel, obj.v.pixel]; // [0]-previs, [1]-next.
        }
        // это оканчательного подавление клонов
        else if (n == two && continuousBrush.active || byArea.active)
        {
          opn = [obj.v.pixel, colorNext]; // [0]-previs, [1]-next.
        }

        if (opn != null)
        {
          // Пока будем сравнивать их цвет.
          let previs = {R: opn[0].R, G: opn[0].G, B: opn[0].B};
          let next = {R: opn[1].R, G: opn[1].G, B: opn[1].B};
          
          if (previs.R == next.R && 
              previs.G == next.G && 
              previs.B == next.B)
          {
            buffer.clone = true;
          }
        }
      };
      conditions(1);
      conditions(2);
    }

    if (!buffer.clone)
    {
      if (BUFSIZE >= buffer.size.max)
      {
        buffer.objs.get(palette.currentList).shift();
      }

      if (typeof obj.v == 'object')
        buffer.objs.get(palette.currentList).push({o: obj, DAndD: (dragAndDrop.active?true:false)});
    }
  }
}

let step = 2;
// 
function stepBack()
{
  if (buffer.size.current() > 0)
  {
    let obj = buffer.objs.get(palette.currentList).pop();

    if (obj.DAndD)
    {
      buffer.previsKey = obj.o.v.world.x+"|"+obj.o.v.world.y;
      
      // if (buffer.previsKey != "")
      let key = buffer.previsKey;

      if (palette.tiles.get(palette.currentList)[1].has(key))
      {
        let iCell = palette.tiles.get(palette.currentList)[1].get(key);
        
        let ULCGx = iCell.keyOnGrid.x;
        let ULCGy = iCell.keyOnGrid.y;
        grid.grid[ULCGy][ULCGx] = "";
        palette.tiles.get(palette.currentList)[1].delete(key);
      }

      //  buffer.previsKey = obj.o.v.world.x+"|"+obj.o.v.world.y;

      step--;

      if (step == 0) { buffer.previsKey = ""; step = 2; }
    }
    
    palette.tiles.get(palette.currentList)[1].set(obj.o.k, obj.o.v);

    let ULCGx = obj.o.v.keyOnGrid.x;
    let ULCGy = obj.o.v.keyOnGrid.y;
    grid.grid[ULCGy][ULCGx] = obj.o.k;
  }
}