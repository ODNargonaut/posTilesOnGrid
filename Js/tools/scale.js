// блокируем колесико, чтобы полосы прокрутки не реагировали на него
document.getElementById('blockScroll').onwheel = function () { return false; }

// document.addEventListener("wheel", wheel, false);

// let mn = 2;
// 
function wheel(e)
{
    if (mouse.onCanvas && update.active)
    {
        mouse.wheel.direction = Math.sign(e.deltaY);

        mouse.posCurActv = false;
        
        for (let k of palette.tiles.keys())
        {
            let w = palette.tiles.get(k).pixel.w;
            let h = palette.tiles.get(k).pixel.h;

            if (wheelDir() )// && w < palette.cell.default.overallSize && h < palette.cell.default.overallSize)
            {
                canvasWidth++;
                // palette.tiles.get(k).pixel.w++;
                // palette.tiles.get(k).pixel.h++;

                // palette.tiles.get(k).local.x -= two * mn;
                // palette.tiles.get(k).local.y -= two * mn;
            }
            else if (!wheelDir()) // && w > palette.cell.default.minSize && h > palette.cell.default.minSize)
            {
                canvasHeight--;
                // palette.tiles.get(k).pixel.w--;
                // palette.tiles.get(k).pixel.h--;

                // palette.tiles.get(k).local.x += two * mn;
                // palette.tiles.get(k).local.y += two * mn;
            }
        }
        if (wheelDir() && cellSZNotFrame < palette.cellSZNotFrame.overallSize)
        {
            cellSZNotFrame++;
            mouse.w++;
            mouse.h++;
            palette.cell.overallSize++;
        }
        else if (!wheelDir() && cellSZNotFrame > palette.cellSZNotFrame.minSize)
        {
            cellSZNotFrame--;
            mouse.w--;
            mouse.h--;
            palette.cell.overallSize--;
        }

        canvasWidthCell = Math.floor(canvasWidth / cellSZNotFrame);
        canvasHeightCell = Math.floor(canvasHeight / cellSZNotFrame);

        mouse.zero.x = Math.floor(canvasWidthCell / half);
        mouse.zero.y = Math.floor(canvasHeightCell / half);
    }
}

// 
function wheelDir()
{
    if (mouse.wheel.direction > zero)
        return true;
    else if (mouse.wheel.direction < zero)
        return false;
}

// скрыть курсор(т.е. красная точка) при перемещении камеры 
// let timerScale = null;
// window.addEventListener('wheel', function () {
//     if (timerScale !== null) {
//         clearTimeout(timerScale);
//     }
//     timerScale = setTimeout(function () {
//         mouse.posCurActv = true;
//     }, 390);
// }, false);
