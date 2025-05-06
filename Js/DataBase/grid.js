// Наш холст-сетка

let grid = 
{
  grid:
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0],
    [0, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0],
    [0, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  getW: () => { return grid.grid[0].length-one; },
  getH: () => { return grid.grid.length-one; },
  setWH: (h, w) => 
  {
    let begend = 0;
    let emptyspace = "";
    let frameBE = [];
    let centreElem = [];

    frameBE.push(begend);
    centreElem.push(begend)
    for (let x = 0; x < w-one; x++)
    {
      frameBE.push(begend);
      centreElem.push(emptyspace);
    }
    centreElem.push(begend);
    frameBE.push(begend);

    grid.grid = [];
    grid.grid.push(frameBE.slice(0));

    for (let y = 0; y < h-one; y++)
      grid.grid.push(centreElem.slice(0));
    grid.grid.push(frameBE.slice(0));
  },
  // drawGrid: () =>
  // {
  //   ctx.beginPath();
  //   ctx.moveTo(cellSZNotFrame-2, cellSZNotFrame);
  //   ctx.lineTo(cellSZNotFrame*2+2, cellSZNotFrame);   // линия вправо
  //   ctx.lineTo(cellSZNotFrame*2+2, cellSZNotFrame*2); // линия вниз
  //   ctx.lineTo(cellSZNotFrame-2, cellSZNotFrame*2);   // линия влево
  //   ctx.closePath();                                  // смыкание начала и конца рисунка (левая стена)
  //   ctx.strokeStyle = '#000000';                      // цвет
  //   ctx.lineWidth = 2;                                // толщина линии
  //   ctx.stroke();
  // },
  currentWH: {w: 5e3, h: 5e3}
};

grid.setWH(5e3, 5e3);

document.getElementById("cellNW").value = grid.getW();
document.getElementById("cellNH").value = grid.getH();



/*

116x58 = 6500px

*/