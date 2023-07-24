
canvas.addEventListener('mousemove', MoveBrush, false);
canvas.addEventListener('mouseup', ClickBrush, false);

// Рисуем/стираем плитку в заданной позиции
function ClickBrush() 
{
    if (brush.active && update.active)
        addOrDelTile();
}
function MoveBrush() 
{
    if (continuousBrush.active && update.active)
        addOrDelTile();
}

// 
function addOrDelTile()
{
    if (!eraset.active)
    {
        let curr = palette.tiles.size;
        let key = mouse.world.x+"|"+mouse.world.y;
        palette.tiles.set(key,
            {
                pixel: 
                { 
                    w: palette.cell.overallSize, 
                    h: palette.cell.overallSize, 
                    color: palette.color.current, 
                    R: palette.color.R,
                    G: palette.color.G,
                    B: palette.color.B, 
                },
                local: 
                { 
                    x: mouse.local.x, y: mouse.local.y, 
                    org: {x: mouse.local.x-shiftCounterX, y: mouse.local.y-shiftCounterY} 
                },
                world: { x: mouse.world.x, y: mouse.world.y },
                comments: {begin:"", end: ""}
            });
        if (curr < palette.tiles.size) 
        {
            comments.counterOfPaintedCells++;
            addComments(key);
        }
    }
    else 
        erasetCur(mouse.world.x, mouse.world.y);
}
