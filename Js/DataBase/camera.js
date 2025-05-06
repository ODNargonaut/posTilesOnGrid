/* Камера */

let camera = 
{
  // Ширина и высота измеряются в клетках!
  w: 116,//468,
  h: 58,//236,
  default: 
  {
    min: {w: 60, h: 30},
    max: {w: 468, h: 236}
  },
  psX: {begin:0, end:116},
  psY: {begin:0, end:58},
  offset: {n:1, upperLeftCorner: {x:zero, y:zero} },
  scale: 
  {
    n: 
    {
      n: 1,
      w: 8*two,  // 468-104-60 = 312/8 = 38 итераций (всего 51. 39 + остаток 8)
      h: 8,      // 236-48-6-30 = 152/8 = 19 итераций
      last: {w: 104, h: 48+6}
    },
    distanceZoomIn: zero,  // отдалить или приблизить камеру
    min: cellMinSize-two, 
    max: cellMaxSize-two
  },
  newPos: () => {return camera.offset.n * cellSZNotFrame;}
  //restrictedArea: false
};

let camOffsetULC_X = zero;
let camOffsetULC_Y = zero;
