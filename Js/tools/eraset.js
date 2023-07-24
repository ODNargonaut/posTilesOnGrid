// 
function erasetCur(x, y)
{
    if (palette.tiles.delete(x + "|" + y))
        comments.counterOfPaintedCells--;
}