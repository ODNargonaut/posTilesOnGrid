// 
let cell = 
{
  w: 1, 
  h: 1,
  offset: {x: 0, y: 0},
  dataOutExp: { marks: "", notMarks: "" },
  dataOutImp: ""
};

let addComm = false;
// 
function DataConcatenation(idW, idL)
{
  // let i = 0;
  // createHTML(idL, "span", grid.getW()+"|"+grid.getH());
  // for (let iCell of palette.tiles.get(palette.currentList)[1].values()) 
  // {
  //   i++;
  //   let psX = iCell.world.x;
  //   let psY = iCell.world.y;

  //   if (psX > zero || psX < zero)
  //   {
  //     psX = psX * cell.w + cell.offset.x;
  //   }
        
  //   if (psY > zero || psY < zero)
  //   {
  //     psY = psY * cell.h + cell.offset.y;
  //   }

  //   if (psX == zero) psX = cell.offset.x;
  //   if (psY == zero) psY = cell.offset.y;

  //   psX = psX.toFixed(numOfDigitsAfterDot);
  //   psY = psY.toFixed(numOfDigitsAfterDot);
        
  //   // export
  //   // createHTML(idW, "span", "= "+iCell.comments.begin+" =");
  //   createHTML(idW, "span", psX);
  //   createHTML(idW, "span", psY);
  //   // createHTML(idW, "span", "=== "+iCell.comments.end+" ===");
        
  //   createHTML(idW, "span", "");

  //   // import
  //   createHTML(idL, "span", iCell.world.x+"|"+iCell.world.y+"_"+iCell.upperLeftCornerOfGrid.x+"|"+iCell.upperLeftCornerOfGrid.y+
  //     "_"+iCell.pixel.R+"|"+iCell.pixel.G+"|"+iCell.pixel.B);


  //   // cell.dataOutExp.marks += "x: "+psX+"  y: "+psY+"\n";
  //   // cell.dataOutExp.notMarks += "\n"+psX+"\n"+psY+"\n";

  //   // cell.dataOutImp += iCell.world.x+"|"+iCell.world.y+"_"+iCell.local.x+"|"+iCell.local.y+" ";
  // }
  document.getElementById("totalCells").innerHTML = palette.tiles.get(palette.currentList)[1].size;  // i
} 

// 
function createHTML(id, name, text, rgb=null)
{
  let teg = document.createElement(name);

  if (rgb != null)
  {
    let r = rgb.R, g = rgb.G, b = rgb.B;
    teg.setAttribute("class", "colByDef");
    teg.setAttribute("style", "color: rgb("+r+","+g+","+b+"); cursor: pointer;");
    teg.setAttribute("onclick", "showColorFrom({R:"+r+",G:"+g+",B:"+b+"})");
  }

  let content = document.createTextNode(text);
  teg.appendChild(content);
  id.appendChild(teg);

  let br = document.createElement("br");
  id.appendChild(br);
}
