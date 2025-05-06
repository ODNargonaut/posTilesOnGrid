/*
  ** ВНИМАНИЕ **
  Буффер работает следующим образом: Если плитка на холсте была затерта/удалена,
  только тогда она попадает в буффер! И ни как больше.
  ** ВНИМАНИЕ **
*/

// 
let buffer = 
{
  clone: false,  // чтобы не было одинаковых в буфере
  objs: new Map([["0", []]]),
  previsKey: "",
  size: 
  {
    current: () => {return buffer.objs.get(palette.currentList).length;},
    max: (6555*1000)
  },
  keyCode: 90,
  active: false
};
