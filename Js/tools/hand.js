
let nextPosHand = {x: zero, y: zero};
let previousPosHand = {x: zero, y:zero};

// 
function handCur(ULCGx, ULCGy)
{
  if (hand.active)
  {
    nextPosHand.x = ULCGx;
    nextPosHand.y = ULCGy;

    camOffsetULC_X = Math.floor(camera.offset.upperLeftCorner.x / cellSZNotFrame);
    camOffsetULC_Y = Math.floor(camera.offset.upperLeftCorner.y / cellSZNotFrame);

    // X
    if (nextPosHand.x > previousPosHand.x && camOffsetULC_X+camera.w < grid.getW())
    {
      camera.offset.upperLeftCorner.x += camera.newPos(); 
      palette.offset.upperLeftCorner.x -= camera.newPos();
    }
    else if (nextPosHand.x < previousPosHand.x && camOffsetULC_X > 0)
    {
      camera.offset.upperLeftCorner.x -= camera.newPos();
      palette.offset.upperLeftCorner.x += camera.newPos();
    }

    // Y
    if (nextPosHand.y > previousPosHand.y && camOffsetULC_Y+camera.h < grid.getH())
    {
      camera.offset.upperLeftCorner.y += camera.newPos();
      palette.offset.upperLeftCorner.y -= camera.newPos();
    }
    else if (nextPosHand.y < previousPosHand.y && camOffsetULC_Y > 0)
    {
      camera.offset.upperLeftCorner.y -= camera.newPos();
      palette.offset.upperLeftCorner.y += camera.newPos();
    }

    previousPosHand.x = nextPosHand.x;
    previousPosHand.y = nextPosHand.y;
  }
}
