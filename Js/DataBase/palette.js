
// Парамерты плиточной палитры
let palette =
{
  cell: 
  {
    overallSize: cellMaxSize,
    minSize: cellMinSize
    // default: { overallSize: 22, minSize: 2}
  },
  cellSZNotFrame: 
  {
    overallSize: 23,
    minSize: 3
  },
  offset: { upperLeftCorner: {x: zero, y: zero} },
  scale: zero,
  color: { current:"#000", R:0,G:0,B:0 },
  colorByDefault: 
  [
    {R: "205", G: "92",  B: "92"},  {R: "240", G: "128", B: "128"}, {R: "250", G: "128", B: "114"}, {R: "233", G: "150", B: "122"}, {R: "255", G: "160", B: "122"}, 
    {R: "220", G: "20",  B: "60"},  {R: "178", G: "34",  B: "34"},  {R: "139", G: "0",   B: "0"},   {R: "255", G: "192", B: "203"}, {R: "255", G: "182", B: "193"}, 
    {R: "255", G: "105", B: "180"}, {R: "255", G: "20",  B: "147"}, {R: "199", G: "21",  B: "133"}, {R: "219", G: "112", B: "147"}, {R: "255", G: "127", B: "80"}, 
    {R: "255", G: "99",  B: "71"},  {R: "255", G: "69",  B: "0"},   {R: "255", G: "140", B: "0"},   {R: "255", G: "165", B: "0"},   {R: "173", G: "255", B: "47"}, 
    {R: "127", G: "255", B: "0"},   {R: "124", G: "252", B: "0"},   {R: "50",  G: "205", B: "50"},  {R: "152", G: "251", B: "152"}, {R: "144", G: "238", B: "144"}, 
    {R: "0",   G: "250", B: "154"}, {R: "0",   G: "255", B: "127"}, {R: "60",  G: "179", B: "113"}, {R: "46",  G: "139", B: "87"},  {R: "34",  G: "139", B: "34"}, 
    {R: "0",   G: "100", B: "0"},   {R: "154", G: "205", B: "50"},  {R: "107", G: "142", B: "35"},  {R: "85",  G: "107", B: "47"},  {R: "102", G: "205", B: "170"}, 
    {R: "143", G: "188", B: "143"}, {R: "32",  G: "178", B: "170"}, {R: "0",   G: "139", B: "139"}, {R: "255", G: "215", B: "0"},   {R: "255", G: "255", B: "224"}, 
    {R: "255", G: "250", B: "205"}, {R: "250", G: "250", B: "210"}, {R: "255", G: "239", B: "213"}, {R: "255", G: "228", B: "181"}, {R: "255", G: "218", B: "185"}, 
    {R: "238", G: "232", B: "170"}, {R: "240", G: "230", B: "140"}, {R: "189", G: "183", B: "107"}, {R: "230", G: "230", B: "250"}, {R: "216", G: "191", B: "216"}, 
    {R: "221", G: "160", B: "221"}, {R: "238", G: "130", B: "238"}, {R: "218", G: "112", B: "214"}, {R: "186", G: "85",  B: "211"}, {R: "147", G: "112", B: "219"}, 
    {R: "138", G: "43",  B: "226"}, {R: "148", G: "0",   B: "211"}, {R: "153", G: "50",  B: "204"}, {R: "139", G: "0",   B: "139"}, {R: "75",  G: "0",   B: "130"}, 
    {R: "106", G: "90",  B: "205"}, {R: "72",  G: "61",  B: "139"}, {R: "224", G: "255", B: "255"}, {R: "175", G: "238", B: "238"}, {R: "127", G: "255", B: "212"}, 
    {R: "64",  G: "224", B: "208"}, {R: "72",  G: "209", B: "204"}, {R: "0",   G: "206", B: "209"}, {R: "95",  G: "158", B: "160"}, {R: "70",  G: "130", B: "180"}, 
    {R: "176", G: "196", B: "222"}, {R: "176", G: "224", B: "230"}, {R: "173", G: "216", B: "230"}, {R: "135", G: "206", B: "235"}, {R: "135", G: "206", B: "250"}, 
    {R: "0",   G: "191", B: "255"}, {R: "30",  G: "144", B: "255"}, {R: "100", G: "149", B: "237"}, {R: "123", G: "104", B: "238"}, {R: "65",  G: "105", B: "225"}, 
    {R: "0",   G: "0",   B: "205"}, {R: "0",   G: "0",   B: "139"}, {R: "0",   G: "0",   B: "128"}, {R: "25",  G: "25",  B: "112"}, {R: "255", G: "248", B: "220"}, 
    {R: "255", G: "235", B: "205"}, {R: "255", G: "228", B: "196"}, {R: "255", G: "222", B: "173"}, {R: "245", G: "222", B: "179"}, {R: "222", G: "184", B: "135"}, 
    {R: "210", G: "180", B: "140"}, {R: "188", G: "143", B: "143"}, {R: "244", G: "164", B: "96"},  {R: "218", G: "165", B: "32"},  {R: "184", G: "134", B: "11"}, 
    {R: "205", G: "133", B: "63"},  {R: "210", G: "105", B: "30"},  {R: "139", G: "69",  B: "19"},  {R: "160", G: "82",  B: "45"},  {R: "165", G: "42",  B: "42"}, 
    {R: "255", G: "250", B: "250"}, {R: "240", G: "255", B: "240"}, {R: "245", G: "255", B: "250"}, {R: "240", G: "255", B: "255"}, {R: "240", G: "248", B: "255"}, 
    {R: "248", G: "248", B: "255"}, {R: "245", G: "245", B: "245"}, {R: "255", G: "245", B: "238"}, {R: "245", G: "245", B: "220"}, {R: "253", G: "245", B: "230"}, 
    {R: "255", G: "250", B: "240"}, {R: "255", G: "255", B: "240"}, {R: "250", G: "235", B: "215"}, {R: "250", G: "240", B: "230"}, {R: "255", G: "240", B: "245"}, 
    {R: "255", G: "228", B: "225"}, {R: "0",   G: "0",   B: "0"},   {R: "192", G: "192", B: "192"}, {R: "255", G: "255", B: "255"}, {R: "255", G: "0",   B: "255"}, 
    {R: "128", G: "0",   B: "128"}, {R: "128", G: "0",   B: "0"},   {R: "255", G: "255", B: "0"},   {R: "128", G: "128", B: "0"},   {R: "0",   G: "128", B: "0"}, 
    {R: "0",   G: "255", B: "255"}, {R: "0",   G: "128", B: "128"}, {R: "220", G: "220", B: "220"}, {R: "211", G: "211", B: "211"}, {R: "169", G: "169", B: "169"}, 
    {R: "128", G: "128", B: "128"}, {R: "105", G: "105", B: "105"}, {R: "119", G: "136", B: "153"}, {R: "112", G: "128", B: "144"}, {R: "47",  G: "79",  B: "79"}
  ],
  reservedColors: [{R:185, G:109, B:109}, {R:255, G:0, B:0}, {R:0, G:255, B:0}, {R:200, G:198, B:198}],
  colorsHistory: new Map(),
  tiles: new Map([ ["0", ["main layer", new Map()]] ]),
  currentList: "0",
  selectTilesList: (nextN, notUpdate=false) => 
  {
    if (!palette.delLayerGrid)
    {
      let clearKeysOnGrid = (show) => 
      {
        if (palette.tiles.get(palette.currentList)[1].size > 0)
        {
          for (let v of palette.tiles.get(palette.currentList)[1].values())
            grid.grid[v.keyOnGrid.y][v.keyOnGrid.x] = show?(v.world.x+"|"+v.world.y):"";
        }
      };

      clearKeysOnGrid(false);

      palette.currentList = ""+nextN;
      
      clearKeysOnGrid(true);

      if (notUpdate)
        getLayersObj("listLayersGrid", palette.tiles);

      document.getElementById("selLayerG").style.display = "block";
      document.getElementById("selLayerGN").innerHTML = nextN;
      document.getElementById("currentLayer").innerHTML = nextN;
      document.getElementById("okCrtLayerG").style.display = "none";
      document.getElementById("errCrtLayerG").style.display = "none";
    }
    else
    {
      // console.log("Был удален слой сетки: "+nextN);
      palette.delLayerGrid = false;
      getLayersObj("listLayersGrid", palette.tiles);
    } 
  },
  delLayerGrid: false,
  cutOut: new Map()  // Вырезанные, при уменьшении размера сетки
};

// по умолчанию (для обозначения середины сетки)
// palette.tiles.get(palette.currentList)[1].set("0|0",
//   {
//     keyOnGrid: {x: mouse.zero.x, y: mouse.zero.y},  // чтобы было проще искать ключ на сетке
//     pixel: { w: palette.cell.overallSize, h: palette.cell.overallSize, hex: "#000000", R:0,G:0,B:0 },
//     upperLeftCornerOfGrid: {x: mouse.zero.x, y: mouse.zero.y, org: {x: mouse.zero.x, y: mouse.zero.y}},  // в какой позиции на сетке находится ключ
//     world: { x: 0, y: 0 },
//     obj: 
//     {
//       N: 0,
//       ru: 
//       {
//         title: "cтена",
//         descript: "" 
//       },
//       en: 
//       {
//         title: "wall",
//         descript: ""
//       }
//     }
//   });
