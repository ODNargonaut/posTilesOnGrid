// Параметры мыши

// 
function MathFloor(n)
{
  return Math.floor(n / half);
}

// 
let mouse =
{
  zero:  // изменяется в зависимости от w/h сетки
  {
    x: MathFloor(grid.getW()),
    y: MathFloor(grid.getH()),
    set: () => 
    {
      mouse.zero.x = MathFloor(grid.getW());
      mouse.zero.y = MathFloor(grid.getH());
    }
  },
  upperLeftCornerOfGrid: { x: zero, y: zero },  // Позиция от верхнего левого угола сетки
  world:                                        // Позиция в центре сетки
  {
    x: zero, y: zero,
    directionX: { positive: null, negative: null },
    directionY: { positive: null, negative: null }
  },
  cell: {w: 24, h: 24},
  w: 12,
  h: 12,
  color: "#B96D6D",
  colorByDefault: "#B96D6D",
  posCurActv: false,
  onCanvas: false,
  clickLeft: false,
  clickRight: false,
  itIsAllowedDrawPointAtThisPos: false,  // в этой позиции разрешается рисовать точку
  wheel: {direction: null}
};
