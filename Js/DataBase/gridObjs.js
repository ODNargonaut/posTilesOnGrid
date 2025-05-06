// Объекты на сетке
let gridObjs = 
{
  listObjs: new Map(),  //  Список объектов на сетке, по сравнению с palette.tiles - здесь объекты не удаляются + они не повторяются!
  obj: null,            //  В момент распознания плитки на сетке
  delLayerGrid: false,
  selected:             //  Установленный в палитре
  {
    N: null, 
    ru: {title: "", descript: ""}, 
    en: {title: "", descript: ""}
  },
  byDefault: 
  {
    Wall: 
    {
      N: 0,
      ru: {title: "стена"},
      en: {title: "wall"},
      color: {R: 0, G: 0, B: 0, hex: "#000000"}
    }, 
    EMPTYSPACE:
    {
      N: 1,
      ru: {title: "пустое пространство"},
      en: {title: "empty space"},
      color: {R: 255, G: 255, B: 255, hex: "#FFFFFF"}
    },
    reservedNums: [0, 1]
  },
  openWindow: false
};
