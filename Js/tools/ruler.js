// 
let rulerObj = 
{
  point: 
  {
    begin: 
    {
      ULCG: {x: null, y: null},
      world: {x: null, y: null},
      actv: false
    },
    intermediate: // промежуточная(ые) точка(и)
    {
      ULCG: {x: null, y: null},
    },
    end: 
    {
      actv: false
    },
    tmpTiles: new Map(),
    // 
    show: (hex, r, g, b, pos) => 
    {
      let setClr = (hex, r, g, b) =>
      {
        palette.color.current = hex;
        palette.color.R = r;
        palette.color.G = g;
        palette.color.B = b;
      }

      let tmp = 
      {
        hex: palette.color.current,
        R: palette.color.R,
        G: palette.color.G,
        B: palette.color.B
      };

      setClr(hex, r, g, b);
      addOrDelTile(rulerObj.point.tmpTiles, pos.ULCGx, pos.ULCGy, pos.Worldx, pos.Worldy);
      setClr(tmp.hex, tmp.R, tmp.G, tmp.B);
    },
    // 
    check: (distFix) =>
    {
      // Аргумент 'distFix' означает: 
      // true - зафиксировать обе точки;
      // false - не фиксировать, а измерить расстояние между точек.

      let pos = getPosULCGAndWorldMouse();

      if (!rulerObj.point.begin.actv)
      {
        rulerObj.point.begin.ULCG.x = pos.ULCGx;
        rulerObj.point.begin.ULCG.y = pos.ULCGy;
        rulerObj.point.begin.world.x = pos.Worldx;
        rulerObj.point.begin.world.y = pos.Worldy;

        rulerObj.point.show("#00FF00", 0, 255, 0, pos);
        
        rulerObj.point.begin.actv = true;
      }
      else if (!rulerObj.point.end.actv && (rulerObj.point.intermediate.ULCG.x != pos.ULCGx || rulerObj.point.intermediate.ULCG.y != pos.ULCGy))
      {
        rulerObj.point.show("#00FF00", 0, 255, 0, pos);

        rulerObj.point.intermediate.ULCG.x = pos.ULCGx;
        rulerObj.point.intermediate.ULCG.y = pos.ULCGy;
      }
      else if (!rulerObj.point.end.actv)
      {
        rulerObj.point.end.actv = true;
        
        rulerObj.point.show("#FF0000", 255, 0, 0, pos);

        let beginPointX = rulerObj.point.begin.ULCG.x;
        let beginPointY = rulerObj.point.begin.ULCG.y;
        let beginPointWX = rulerObj.point.begin.world.x;
        let beginPointWY = rulerObj.point.begin.world.y;
        
        let res = "";
        let rst = ""; // cтрока результат
        let action = 
        {
          // xy - означает, если 1 то одна ось, а если 2 то обе оси.
          dist: {xy: zero},
          fix: {xy: zero}
        };
        if (beginPointX != pos.ULCGx)
        {
          if (distFix)
          {
            rst += "Begin.X="+beginPointWX+"  End.X="+pos.Worldx;
            
            action.fix.xy++;
          }
          else
          {
            res = beginPointX-pos.ULCGx;
            res = res < 0?res*-1:res*1;
            
            rst += "X="+(res+1);

            action.dist.xy++;
          }
        }
        if (beginPointY != pos.ULCGy)
        {
          if (distFix)
          {
            rst += "Begin.Y="+beginPointWY+"  End.Y="+pos.Worldy;

            action.fix.xy++;
          }
          else
          {
            res = beginPointY-pos.ULCGy;
            res = res < 0?res*-1:res*1;

            rst += "Y="+(res+1);

            action.dist.xy++;
          }
        }

        let str = "";
        let title = "Расстояние между точками по ос";

        // Dist
        if (!distFix && action.dist.xy == one)
        {
          str += title+"и "+rst;
        }
        else if (!distFix && action.dist.xy == two)
        {
          let ny = rst.indexOf("Y")
          let dx = rst.slice(0, ny);
          let dy = rst.slice(ny);

          str += title+"ям "+dx+" и "+dy;
        }

        // Fix
        if (distFix && action.fix.xy == one)
        {
          str += rst;
        }
        else if (distFix && action.fix.xy == two)
        {
          let ny = rst.indexOf("Begin.Y")
          let fx = rst.slice(0, ny);
          let fy = rst.slice(ny);

          str += fx+" и "+fy;
        }

        document.getElementById("distFixXY").innerHTML = str;
      }
    }
  },
  measureDist: false,
  fixPosPoint: false,
  
};


// Измерить расстояние
function measureDist()
{
  if (ruler.active && !rulerObj.fixPosPoint)
  {
    rulerObj.measureDist = true;

    rulerObj.point.check(false);
  }
}


// Зафиксировать позицию двух точек
function fixPosPoints()
{
  if (ruler.active && !rulerObj.measureDist)
  {
    rulerObj.fixPosPoint = true;

    rulerObj.point.check(true);
  }
}


// Очистить линейку 
function clearRuler()
{
  rulerObj.measureDist = false;
  rulerObj.fixPosPoint = false;
  rulerObj.point.begin.actv = false;
  rulerObj.point.end.actv = false;

  for (let k of rulerObj.point.tmpTiles.keys())
  {
    let point = rulerObj.point.tmpTiles.get(k);

    if (!palette.tiles.get(palette.currentList)[1].has(k))
      grid.grid[point.keyOnGrid.y][point.keyOnGrid.x] = "";
  }

  rulerObj.point.tmpTiles.clear();
}
