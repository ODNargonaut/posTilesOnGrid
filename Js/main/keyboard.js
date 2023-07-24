document.addEventListener("keydown", press, false);
document.addEventListener("keyup", tearOff, false);

function press(e)
{
    let modeByArea = document.getElementById("modeA");
    let modeHand = document.getElementById("modeH");

    if (!dataOutWindow && mouse.onCanvas)
    {
        // ByArea
        // if (e.keyCode == byArea.keyCode && !byArea.active)
        // {
        //     byArea.active = true;
        //     modeByArea.style.backgroundColor = "green";
        // }

        // Hand
        if (e.keyCode == hand.keyCode && !hand.active && update.active)
        {
            hand.active = true;
            modeHand.style.backgroundColor = "green";
            mouse.posCurActv = false;
            setTimeout(pauseOFF, 2);
        }

        // Pause
        if (e.keyCode == pause.keyCode && update.active)
        {
            mouse.posCurActv = false;
        }
    }
}

// 
function tearOff(e) 
{
    let modeBrush = document.getElementById("modeB");
    let modeCBrush = document.getElementById("modeC");
    let modeByArea = document.getElementById("modeA");
    let modeHand = document.getElementById("modeH");
    let modeEraset = document.getElementById("modeD");

    if (!dataOutWindow && mouse.onCanvas)
    {
        // Pause
        if (e.keyCode == pause.keyCode && !update.active)
        {
            pauseON();
        }
        else if (e.keyCode == pause.keyCode && update.active)
        {
            pauseOFF();
        }
        
        // Brush
        if (e.keyCode == brush.keyCode && !brush.active)
        {
            brush.active = true;
            modeBrush.style.backgroundColor = "green";
        }
        else if (e.keyCode == brush.keyCode && brush.active)
        {
            brush.active = false;
            modeBrush.style.backgroundColor = "";
        }

        // CountinuousBrush
        if (e.keyCode == continuousBrush.keyCode && !continuousBrush.active)
        {
            continuousBrush.active = true;
            modeCBrush.style.backgroundColor = "green";
        }
        else if (e.keyCode == continuousBrush.keyCode && continuousBrush.active)
        {
            continuousBrush.active = false;
            modeCBrush.style.backgroundColor = "";
        }

        // ByArea
        //  if (e.keyCode == byArea.keyCode && byArea.active)
        // {
        //     byArea.active = false;
        //     modeByArea.style.backgroundColor = "";
        // }

        // Hand
        if (e.keyCode == hand.keyCode && hand.active)
        {
            hand.active = false;
            modeHand.style.backgroundColor = "";
            pauseON();
        }

        // Eraset
        if (e.keyCode === eraset.keyCode && !eraset.active)
        { 
            eraset.active = true;
            modeEraset.style.backgroundColor = "green";
        }
        else if (e.keyCode == eraset.keyCode && eraset.active)
        {
            eraset.active = false;
            modeEraset.style.backgroundColor = "";
        }
    }
}


let indicator = document.getElementById("ind");
let hint = document.getElementById("hint");
// 
function pauseON()
{
    update.id = setInterval(start, one);
    update.active = true;
    mouse.posCurActv = true;
    indicator.style.backgroundColor = "rgb(5, 255, 5)";
    hint.innerHTML = "";
}

// 
function pauseOFF()
{
    clearInterval(update.id);
    update.active = false;
    indicator.style.backgroundColor = "rgb(255, 21, 0)";
}
