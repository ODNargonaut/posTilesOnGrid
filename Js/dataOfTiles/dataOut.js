// ====== Вывод инфо об плитках на холсте ======

// 
function dataOut()
{
    if (palette.tiles.size > zero)
    {
        // cell.dataOutExp.marks = "";
        // cell.dataOutExp.notMarks = "";
        // cell.dataOutImp = "";
        
        let idW = document.getElementById("data-out");
        let idL = document.getElementById("data-out2");
        
        idW.innerHTML = "";
        idL.innerHTML = "";

        DataConcatenation(idW, idL);

        document.getElementById("btnCOPY").style.display = "block";
    }
}
