
let tmpCellArea = [];
let point = 
{
    start: 
    {
        world: {x: null, y: null},
        local: {x: null, y: null}
    },
    end: 
    {
        world: {x: null, y: null},
        local: {x: null, y: null}
    }
};
let nextPosArea = {x: zero, y: zero};
let previousPosArea = {x: zero, y:zero};

// Рисуем/стираем плитку по площади
function drawingByArea(Wx, Wy, Lx, Ly)
{
    if (byArea.active)
    {
        if (point.start.world.x == null && point.start.world.y == null && 
            point.start.local.x == null && point.start.local.y == null)
        {
            point.start.world.x = Wx;
            point.start.world.y = Wy;
            point.start.local.x = Lx;
            point.start.local.y = Ly;
        }

        nextPosArea.x = Lx;
        nextPosArea.y = Ly;

        if (nextPosArea.x > previousPosArea.x)
        {
            endPoint(Wx, Wy, Lx, Ly);
            previousPosArea.x = nextPosArea.x;
        }
        else if (nextPosArea.x < previousPosArea.x)
        {
            // erasetCur(Wx, Wy);
            // previousPosArea.x = nextPosArea.x;
        }

        if (nextPosArea.y > previousPosArea.y)
        {
            endPoint(Wx, Wy, Lx, Ly);
            previousPosArea.y = nextPosArea.y;
        }
        else if (nextPosArea.y < previousPosArea.y)
        {
            // erasetCur(Wx, Wy);
            // previousPosArea.y = nextPosArea.y;
        }
        addNewTilesByArea();
    }
    // if (!byArea.active && tmpCellArea.length > 0)
    // {
    //     console.log("массив полан!");
    //     tmpCellArea = [];
    // }
}

// 
function endPoint(Wx, Wy, Lx, Ly)
{
    if (point.end.world.x == null && point.end.world.y == null &&
        point.end.local.x == null && point.end.local.y == null)
    {
        point.end.world.x = Wx;
        point.end.world.y = Wy;
        point.end.local.x = Lx;
        point.end.local.y = Ly;
    }
}

// 
function addNewTilesByArea()
{
    if (point.start.world.x != point.end.world.x || point.start.world.y != point.end.world.y) // не сработает если мы находимся в одной точке
    {
        let quantityCellX = point.end.local.x - point.start.local.x;
        let quantityCellY = point.end.local.y - point.start.local.y;

        for (let y = 0; y < (!quantityCellY?1:quantityCellY); y++)
        {
            for (let x = 0; x < (!quantityCellX?1:quantityCellX); x++)
            {
                palette.tiles.set((point.start.world.x+x) + "|" + (point.start.world.y+y),
                    {
                        pixel: { w: palette.cell.overallSize, h: palette.cell.overallSize, color: palette.color },
                        local: { x: point.start.local.x+x, y: point.start.local.y+y },
                        world: { x: point.start.world.x+x, y: point.start.world.y+y }
                    });
            }
        }
    }
}
