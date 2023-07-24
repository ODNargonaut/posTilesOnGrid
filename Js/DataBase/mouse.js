
// Параметры мыши
let mouse =
{
    zero: // изменяется в зависимости от w/h холста
    {
        x: Math.floor(canvasWidthCell / half),
        y: Math.floor(canvasHeightCell / half)
    },
    local: { x: zero, y: zero },
    world:
    {
        x: zero, y: zero,
        directionX: { positive: null, negative: null },
        directionY: { positive: null, negative: null }
    },
    cell: {w: 24, h: 24},
    w: 22,
    h: 22,
    color: "#B96D6D",
    posCurActv: false,
    onCanvas: false,
    clickLeft: false,
    clickRight: false,
    wheel: {direction: null}
};

function setMouseZero()
{
    mouse.zero.x = Math.floor(canvasWidthCell / half);
    mouse.zero.y = Math.floor(canvasHeightCell / half);
}
