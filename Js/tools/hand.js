
let nextPosHand = {x: zero, y: zero};
let previousPosHand = {x: zero, y:zero};
let offsetScroll = 20;

// 
function handCur(x, y)
{
    if (hand.active)
    {
        nextPosHand.x = x;
        nextPosHand.y = y;

        if (nextPosHand.x > previousPosHand.x)
        {
            document.getElementById("blockScroll").scrollLeft -= offsetScroll;
            previousPosHand.x = nextPosHand.x;
        }
        else if (nextPosHand.x < previousPosHand.x)
        {
            document.getElementById("blockScroll").scrollLeft += offsetScroll;
            previousPosHand.x = nextPosHand.x;
        }

        if (nextPosHand.y > previousPosHand.y)
        {
            document.getElementById("blockScroll").scrollTop -= offsetScroll;
            previousPosHand.y = nextPosHand.y;
        }
        else if (nextPosHand.y < previousPosHand.y)
        {
            document.getElementById("blockScroll").scrollTop += offsetScroll;
            previousPosHand.y = nextPosHand.y;
        }
    }
}