canvas.addEventListener('mousemove', MoveMousePos, false);

// ***** В разработке или мне просто лень закончить *****
// #1
// document.addEventListener('mousemove', startInteractionTimer, false);
//
// let ID2Update = null;
//
// function StopUpdate()
// {
//     indicator.style.backgroundImage = "url(./img/canvasIndicator/notActive.png)";
// }

// //
// function startUpdate()
// {
//     indicator.style.backgroundImage = "url(./img/canvasIndicator/active.png)";
//     hint.innerHTML = "";
//     clearInterval(ID2Update);
//     ID2Update = setInterval(startPlayUpdate, 250);
// }
// 
// # 2
// let timerCur = null;
// window.addEventListener('wheel', function ()
// {
//     if (timerCur !== null)
//         clearTimeout(timer);
//     timerCur = setTimeout(function ()
//     {
//         update.active = false;
//         indicator.style.backgroundImage = "url(./img/canvasIndicator/notActive.png)";
//     }, 100);
// }, false);
// ***** ================== *END* ================ *****


let not = false;
// 
function cursorOnCanvas(active) 
{
    mouse.onCanvas = active;
}

// 
function cnvEPage(e, axis) 
{
    if (axis == "X")
        return e.pageX - e.target.offsetLeft;
    else if (axis == "Y")
        return e.pageY - e.target.offsetTop;
}

// Отслеживаем pos курсора на странице
function MoveMousePos(e) 
{
    let psX = cnvEPage(e, "X");
    let psY = cnvEPage(e, "Y");

    handCur(psX, psY);

    psX += document.getElementById("blockScroll").scrollLeft;
    psY += document.getElementById("blockScroll").scrollTop;

    mouse.local.x = Math.floor(psX / cellSZNotFrame);
    mouse.local.y = Math.floor(psY / cellSZNotFrame);

    mouse.world.x = mouse.local.x - mouse.zero.x;
    mouse.world.y = -(mouse.local.y - mouse.zero.y);

    // if (!hand.active)
    //     drawingByArea(mouse.world.x, mouse.world.y, mouse.local.x, mouse.local.y);
}

// Позиция курсора на холсте
function cursorPosOnCanvas()
{
    let x = "X: "; let y = " Y: ";
    
    if (mouse.onCanvas && mouse.posCurActv)
    {
        x += mouse.world.x;
        y += mouse.world.y;
    }
    else 
    {
        x += "null";
        y += "null";
    }

    document.getElementById("psX").innerHTML = x;
    document.getElementById("psY").innerHTML = y;
}
