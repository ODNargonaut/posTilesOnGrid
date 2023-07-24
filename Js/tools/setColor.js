// fillRect
let idFillRect = document.getElementById("fillRect");

// list colors
let idListColorHistory = document.getElementById("blListColorHistory");
let idListColorByDefault = document.getElementById("blListColorByDefault");


// rgb
let idR = document.getElementById("inpPR");
let idG = document.getElementById("inpPG");
let idB = document.getElementById("inpPB");
let idHEX = document.getElementById("inpPHEX");

// slider
let slider = 
{
    R: document.getElementById("rangeR"),
    G: document.getElementById("rangeG"),
    B: document.getElementById("rangeB"),
    currentValue: { r: 130, g: 70, b: 190 }
};

// change background
slider.R.oninput = function () 
{ 
    idR.value = this.value;
    slider.currentValue.r = Number(this.value.trim());
    setColor("slider");
}
slider.G.oninput = function () 
{ 
    idG.value = this.value;
    slider.currentValue.g = Number(this.value.trim());
    setColor("slider");
}
slider.B.oninput = function () 
{ 
    idB.value = this.value;
    slider.currentValue.b = Number(this.value.trim());
    setColor("slider");
}

// 
function setColor(selected="")
{
    if (selected === "slider")
    {
        let r = slider.currentValue.r;
        let g = slider.currentValue.g;
        let b = slider.currentValue.b;
        idFillRect.style.backgroundColor = "rgb("+r+","+g+","+b+")";
        idHEX.value = ("#"+r.toString(HEX)+g.toString(HEX)+b.toString(HEX)).toUpperCase();
    }
    else 
    {
        let err = {e:0};
        
        if (idR.value.trim().length === "") err.e += ER;
        if (idG.value.trim().length === "") err.e += EG;
        if (idB.value.trim().length === "") err.e += EB;
        if (idHEX.value.trim().length === "") err.e += EHEX;

        if (err.e === 0) err.e = EHEX;

        if (err.e === ER+EG+EB+EHEX)
            console.log("Error: "+ER+","+EG+","+EB+","+EHEX);
        else if (err.e === EHEX) 
        {
            if ("" + (+idR.value) === "NaN") console.log("Error R: " + (err.e = ENUM));
            if ("" + (+idG.value) === "NaN") console.log("Error G: " + (err.e = ENUM));
            if ("" + (+idB.value) === "NaN") console.log("Error B: " + (err.e = ENUM));
            if (err.e !== ENUM) err.e = OK+ER+EG+EB;
        }
        else if (err.e === ER+EG+EB) // данное условие ПОКА не используется
        {
            if (idHEX.value.trim().length < three) console.log("Error Hex: " + (err.e = ELEN));
            else if (idHEX.value.trim().length == three && idHEX.value[0] == '#') console.log("Error Hex: " + (err.e = EHEX));
            checkHexCode(idHEX.value, err);
            if (err.e !== ELEN && err.e !== EHEX) err.e = OK+EHEX;
        }

        if (err.e === OK+ER+EG+EB)
        {
            idListColorHistory.innerHTML = "";
            
            let r = +idR.value, b = +idB.value, g = +idG.value;
            
            showColorFrom({R:r, G:g, B:b});
            
            palette.color.current = ("#"+r.toString(HEX)+g.toString(HEX)+b.toString(HEX)).toUpperCase();
            palette.color.R = r;
            palette.color.G = g;
            palette.color.B = b;
            
            palette.colorsHistory.set(palette.color.current, {R:r,G:g,B:b});
            
            for (let h of palette.colorsHistory.keys())
            {
                let v = palette.colorsHistory.get(h);
                createHTML(idListColorHistory, "span", h, {R:v.R, G:v.G, B:v.B});
            }
        }
    }
}

// 
function listColorByDefalut()
{
    for (let i = zero; i < palette.colorByDefault.length; i++)
    {
        let rgb = palette.colorByDefault[i];
        let codeHex = ("#"+(+rgb.R).toString(HEX)+(+rgb.G).toString(HEX)+(+rgb.B).toString(HEX)).toUpperCase();
        createHTML(idListColorByDefault, "span", codeHex, rgb);
    }
}

// 
function showColorFrom(rgb)
{
    let r = +rgb.R;
    let g = +rgb.G;
    let b = +rgb.B;
    
    rgb.R = rgb.R.toString(HEX);
    rgb.G = rgb.G.toString(HEX);
    rgb.B = rgb.B.toString(HEX);
    
    let hex = "#"+(rgb.R+rgb.G+rgb.B).toUpperCase();

    idR.value = r;
    idG.value = g;
    idB.value = b;
    idHEX.value = hex;

    slider.R.value = r;
    slider.G.value = g;
    slider.B.value = b;
    slider.currentValue.r = r;
    slider.currentValue.b = b;
    slider.currentValue.g = g;

    idFillRect.style.backgroundColor = "rgb("+r+","+g+","+b+")";

}

// 
function checkHexCode(v, err)
{
    let tmpHex = v.toLowerCase();
    for (let i = 0; i < tmpHex.length; i++)
    {
        switch(tmpHex[i])
        {
            case '#':case '0':case '1':case '2':case '3':case '4':case '5':
            case '6':case '7':case '8':case '9':case 'a':case 'b':case 'c':
            case 'd':case 'e':case 'f':case 'A':case 'B':case 'C':case 'D':
            case 'E':case 'F': break;
            default:
                console.log("Error Hex: "+(err.e=EHEX));
                break;
        }
    }
    
}
