// 
function start()
{
    ctx.clearRect(zero, zero, canvas.width, canvas.height);

    cursorPosOnCanvas();
    
    for (let iCell of palette.tiles.values())
    {
        ctx.fillStyle = iCell.pixel.color;
        ctx.fillRect(iCell.local.x * cellSZNotFrame, iCell.local.y * cellSZNotFrame, iCell.pixel.w, iCell.pixel.h);
    }

    // for (let y = 0; y < canvasHeight; y++)
    //     for (let x = 0; x < canvasWidth; x++)
    //         ctx.fillRect(x * cellSZNotFrame, y * cellSZNotFrame, palette.tiles.get("0|0").pixel.w, palette.tiles.get("0|0").pixel.h);

    if (mouse.onCanvas && mouse.posCurActv)
    {
        ctx.fillStyle = mouse.color;
        ctx.fillRect(mouse.local.x * cellSZNotFrame, mouse.local.y * cellSZNotFrame, mouse.w, mouse.h);
    }

    // grid2();
}
