// 
let layersObj = 
{
  openWindow: false,
  mainTeg: "listLayersObj",
  sizeBlockLayer: 865,      // Измеряется в пикселях (px)
  maxSZTitle: 69,           // Максимальный размер строки у title в слое
  reservedNums: (checkN, listObj) => 
  {
    for (let i = 0; i < listObj.length; i++)
      if (checkN == listObj[i]) return false;
    return true;
  }
};