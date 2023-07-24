// Для копирования данных
function copyDataOut(way) 
{
    if (palette.tiles.size > zero)
    {
        if (way == "exp")
        {
            if (doNeedToSignCoord)
                window.prompt("Copy to clipboard: Ctrl+C, Enter", cell.dataOutExp.marks);
            else
                window.prompt("Copy to clipboard: Ctrl+C, Enter", cell.dataOutExp.notMarks);
        }
        else if (way == "imp")
        {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", cell.dataOutImp);
        }
    }
}
