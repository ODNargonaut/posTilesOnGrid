
// 
let tmpTiles = new Map();

// 
let point = 
{
  start: 
  {
    ULCG: {x: null, y: null},
    world: {x: null, y: null},
    actv: true
  },
  end: 
  {
    ULCG: {x: null, y: null},
    world: {x: null, y: null}
  }
};

let nextMouseULCG = 
{
  x: zero, y: zero,  
  shiftToMore: {bl: false, up: false, down: false},
  shiftToLess: {bl: false, up: false, down: false}
};
let previsMouseULCG = {x: zero, y: zero,};

// В разработке: Исправлял баг у инструмента "Рисование по площади".
// let posForSqueeze = 
// {
//   end: new Map(),  // хранит координаты для эффекта сжатия
//   counter: 0
// }
// 
// Определяет в каком из 4-х секторов на осях XY мы находимся
// let sectorXY = 
// {
//   identifySector: () => 
//   { // Как рассуждаю:
//     //      y
//     //  -X+Y|+X+Y
//     //  ____|____x
//     //  -X-Y|0 
//     //      |+X-Y
//     // 
//     // Как работает:
//     //  ____x
//     // |0
//     // |+X-Y
//     // y

//     // Для "-X+Y"
//     if (point.start.ULCG.x > point.end.ULCG.x 
//         && 
//         point.start.ULCG.y > point.end.ULCG.y) return true;

//     // Для  "+X+Y"
//     else if (point.start.ULCG.x < point.end.ULCG.x
//         && 
//         point.start.ULCG.y > point.end.ULCG.y) return false;

//     // Для "-X-Y"
//     else if (point.start.ULCG.x > point.end.ULCG.x 
//         && 
//         point.start.ULCG.y < point.end.ULCG.y) return false;

//     // Для "+X-Y"
//     else if (point.start.ULCG.x < point.end.ULCG.x
//         && 
//         point.start.ULCG.y < point.end.ULCG.y) return true;

//     // Для "X=0 Y=0"
//     else 
//       return true;
//   }
// };


// Рисуем/стираем плитку по площади
function drawingByArea(moveMouse=true, ps=null)
{
  if (byArea.active)
  {
    let pos = getPosULCGAndWorldMouse();

    nextMouseULCG.x = pos.ULCGx;
    nextMouseULCG.y = pos.ULCGy;
      
    if (point.start.actv)
    {
      point.start.ULCG.x = pos.ULCGx;
      point.start.ULCG.y = pos.ULCGy;
      point.start.world.x = pos.Worldx;
      point.start.world.y = pos.Worldy;

      point.start.actv = false;
    }

    // XY Right and Down
    let more = (next, previs, axis) => 
    {
      if (next > previs)
      {
        nextMouseULCG.shiftToMore.bl = true;

        // В разработке
        // if (sectorXY.identifySector() && posForSqueeze.counter > 0)
        // {
        //   posForSqueeze.end.delete(""+posForSqueeze.counter--);
        //   // console.log("\n222 Удаляем: size = "+posForSqueeze.end.size);
        // }
      }
      else if (next < previs)
      {
        nextMouseULCG.shiftToMore.bl = false;
        squeezeMore(axis);

        // В разработке
        // if (sectorXY.identifySector() && moveMouse)
        // {
        //   posForSqueeze.end.set(""+(++posForSqueeze.counter), 
        //     {
        //       ULCG: {x: pos.ULCGx, y: pos.ULCGy},
        //       world: {x: pos.Worldx, y: pos.Worldy}
        //     });
        //   // console.log("\n222 Добавляем: size = "+posForSqueeze.end.size);
        // }
        // else
        // {
        //   console.log("Сжимаем 222.");
        //   squeezeMore(axis);
        // }
      }
    }

    // XY Left and Up 
    let less = (next, previs, axis) => 
    {
      if (next < previs)
      {
        nextMouseULCG.shiftToLess.bl = true;

        // В разработке
        // if (sectorXY.identifySector() && posForSqueeze.counter > 0)
        // {
        //   posForSqueeze.end.delete(""+posForSqueeze.counter--);
        //   // console.log("\n111 Удаляем: size = "+posForSqueeze.end.size);
        // }
      }
      else if (next > previs)
      {
        nextMouseULCG.shiftToLess.bl = false;
        squeezeLess(axis);

        // В разработке
        // if (sectorXY.identifySector() && moveMouse)
        // {
        //   posForSqueeze.end.set(""+(++posForSqueeze.counter), 
        //     {
        //       ULCG: {x: pos.ULCGx, y: pos.ULCGy},
        //       world: {x: pos.Worldx, y: pos.Worldy}
        //     });
        //   // console.log("\n111 Добавляем: size = "+posForSqueeze.end.size);
        // }
        // else 
        // {
        //   console.log("Сжимаем 111.")
        //   squeezeLess(axis);
        // }
      }
    }

    // X Right
    if (point.start.ULCG.x <= point.end.ULCG.x)
    {
      // if (point.start.ULCG.y > point.end.ULCG.y)
      // {
      //   nextMouseULCG.shiftToMore.up = true;
      //   nextMouseULCG.shiftToMore.down = false;
      // }
      // if (point.start.ULCG.y < point.end.ULCG.y)
      // {
      //   nextMouseULCG.shiftToMore.up = false;
      //   nextMouseULCG.shiftToMore.down = true;
      // }
      
      more(nextMouseULCG.x, previsMouseULCG.x, "X");
    }
    // X Left
    if (point.start.ULCG.x >= point.end.ULCG.x)
    {
      less(nextMouseULCG.x, previsMouseULCG.x, "X");
    }

    // Y Down
    if (point.start.ULCG.y <= point.end.ULCG.y)
    {
      more(nextMouseULCG.y, previsMouseULCG.y, "Y");
    }
    // Y Up
    if (point.start.ULCG.y >= point.end.ULCG.y)
    {
      less(nextMouseULCG.y, previsMouseULCG.y, "Y");
    }
    

    if (nextMouseULCG.shiftToMore.bl)
    {
      stretchMore();
    }
    else if (nextMouseULCG.shiftToLess.bl)
    {
      stretchLess();
    }

    point.end.ULCG.x = pos.ULCGx;
    point.end.ULCG.y = pos.ULCGy;
    point.end.world.x = pos.Worldx;
    point.end.world.y = pos.Worldy;

    previsMouseULCG.x = nextMouseULCG.x;
    previsMouseULCG.y = nextMouseULCG.y;

  }
  else if (!point.start.actv)
  {
    point.start.actv = true;

    // posForSqueeze.end.clear();
    // posForSqueeze.counter = 0;
  }
}

// Растянуть по осям X и Y в большее направление
function stretchMore()
{
  // let up = nextMouseULCG.shiftToMore.up;
  // let down = nextMouseULCG.shiftToMore.down;
  
  // let checkY = (n) => 
  // {
  //   if (up) return n >= point.end.ULCG.y;
  //   else if (down) return n <= point.end.ULCG.y;
  // }

  for (let y = point.start.ULCG.y, wy = point.start.world.y; y <= point.end.ULCG.y; y++, wy--) //y+=(up?-1:down?1:1), wy-=(up?-1:down?1:1))
  {
    for (let x = point.start.ULCG.x, wx = point.start.world.x; x < point.end.ULCG.x; x++, wx++)
    {
      let key = wx+"|"+wy;
      if (!eraset.active)
        addOrDelTile(tmpTiles, x, y, wx, wy);
      else if (eraset.active && palette.tiles.get(palette.currentList)[1].has(key))
      {
        tmpTiles.set(key, palette.tiles.get(palette.currentList)[1].get(key));
        erasetCur(wx, wy);
      }
    }
  }
}

// Растянуть по осям X и Y в меньшее направление
function stretchLess()
{
  for (let y = point.start.ULCG.y, wy = point.start.world.y; y >= point.end.ULCG.y; y--, wy++)
  {
    for (let x = point.start.ULCG.x, wx = point.start.world.x; x > point.end.ULCG.x; x--, wx--)
    {
      let key = wx+"|"+wy;
      if (!eraset.active)
        addOrDelTile(tmpTiles, x, y, wx, wy);
      else if (eraset.active && palette.tiles.get(palette.currentList)[1].has(key))
      {
        tmpTiles.set(key, palette.tiles.get(palette.currentList)[1].get(key));
        erasetCur(wx, wy);
      }
    }
  }
}


// Сжимать по осям X и Y в большее направление
function squeezeMore(axis)
{
  let checkXY = (sxy, n) => 
  {
    if (axis == "X")
      return (sxy=="y"?n >= point.start.ULCG.y:sxy=="x"?n > point.end.ULCG.x-one:zero);
    else if (axis == "Y")
      return (sxy=="y"?n > point.end.ULCG.y-one:sxy=="x"?n >= point.start.ULCG.x:zero)
  }

  for (let y = point.end.ULCG.y, wy = point.end.world.y; checkXY("y", y); y--, wy++)
  {
    for (let x = point.end.ULCG.x, wx = point.end.world.x; checkXY("x", x); x--, wx--)
    {
      let key = wx+"|"+wy;
      if (!eraset.active)
        erasetCur(wx, wy, tmpTiles);
      else if (tmpTiles.has(key))
      {
        let iCell = tmpTiles.get(key);
        palette.tiles.get(palette.currentList)[1].set(key, iCell);
        grid.grid[iCell.upperLeftCornerOfGrid.y][iCell.upperLeftCornerOfGrid.x] = key;

        tmpTiles.delete(key);
      }
    }
  }
}

// Сжимать по осям X и Y в меньшее направление
function squeezeLess(axis)
{
  let checkXY = (sxy, n) => 
  {
    if (axis == "X")
      return (sxy=="y"?n <= point.start.ULCG.y:sxy=="x"?n < point.end.ULCG.x+one:zero);
    else if (axis == "Y")
      return (sxy=="y"?n < point.end.ULCG.y+one:sxy=="x"?n <= point.start.ULCG.x:zero)
  }

  for (let y = point.end.ULCG.y, wy = point.end.world.y; checkXY("y", y); y++, wy--)
  {
    for (let x = point.end.ULCG.x, wx = point.end.world.x; checkXY("x", x); x++, wx++)
    {
      let key = wx+"|"+wy;
      if (!eraset.active)
        erasetCur(wx, wy, tmpTiles);
      else if (tmpTiles.has(key))
      {
        let iCell = tmpTiles.get(key);
        palette.tiles.get(palette.currentList)[1].set(key, iCell);
        grid.grid[iCell.upperLeftCornerOfGrid.y][iCell.upperLeftCornerOfGrid.x] = key;

        tmpTiles.delete(key);
      }
    }
  }
}

// 
function addTilesToMainCollection()
{
  if (tmpTiles.size > zero && !eraset.active)
  {
    for (let obj of tmpTiles)
    {
      let k = obj[0], v = obj[1];
      addInBuffer({k: k}, {R: palette.color.R, G: palette.color.G, B: palette.color.B});
      palette.tiles.get(palette.currentList)[1].set(k, v);
    }
  }
  tmpTiles.clear();
}
