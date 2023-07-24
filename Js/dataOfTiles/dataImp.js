// 
function dataImport()
{
    document.getElementById("errImpData").style.display = "none";

    let id = document.getElementById("dataForImp");
    let str = id.value.trim();
    id.value = "";
    
    let err = {e:OK};

    if (str != "")
    {
        let arrData = str.split(' ');

        let canvasWH = arrData.shift();
        canvasWH = canvasWH.split('|');

        settingsCanvas.w = canvasWH[0];
        settingsCanvas.h = canvasWH[1];
        
        setCanvasSize("wh", err);

        if (err.e === OK)
        {
            for (let i = zero; i < arrData.length; i++)
            {
                // if (arrData[i].indexOf('_') == -1) { err.e = LEVEL2; break; }
                let tmpAr = arrData[i].split('_');
                
                // if (tmpAr[zero].indexOf('|') == -1) { err.e = LEVEL3; break; }
                let coordsXYW = tmpAr[zero].split('|');
                
                // if (tmpAr[one].indexOf('|') == -1) { err.e = LEVEL4; break; }
                let coordsXYL = tmpAr[one].split('|');

                let rgb = tmpAr[two].split('|');
                
                let world = {}, local = {};
                
                world.x = +coordsXYW[zero]; world.y = +coordsXYW[one];
                local.x = +coordsXYL[zero]; local.y = +coordsXYL[one];

                rgb[zero] = +rgb[zero]; rgb[one] = +rgb[one]; rgb[two] = +rgb[two];

                if (""+world.x === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5
                if (""+world.y === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5
                if (""+local.x === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5
                if (""+local.y === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL5

                if (""+rgb[zero] === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL6
                if (""+rgb[one]  === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL6
                if (""+rgb[two]  === "NaN") console.log("Error: "+(err.e=ENUM)); // LEVEL6

                if (err.e!=OK) break;

                let color = "#"+rgb[0].toString(HEX)+rgb[1].toString(HEX)+rgb[2].toString(HEX);

                palette.tiles.set(world.x + "|" + world.y,
                    {
                        pixel: 
                        { 
                            w: palette.cell.overallSize, 
                            h: palette.cell.overallSize, 
                            color: color,
                            R: rgb[zero],
                            G: rgb[one],
                            B: rgb[two] 
                        },
                        local: 
                        { 
                            x: local.x, y: local.y,
                            org: {x: local.x, y: local.y} 
                        },
                        world: { x: world.x, y: world.y }
                    });
            }
        }
    }
    if (err.e != OK)
    {
        document.getElementById("errImpData").style.display = "block";
        console.log("Error: level "+err.e);
    }
}
