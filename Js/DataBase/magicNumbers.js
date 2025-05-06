let zero = 0, one = 1, two = 2, three = 3;

let cellMaxSize = 11;
let cellMinSize = 2;

let cellSZNotFrame = 12;   // без рамки
// let previsCellSZNotFrame = cellSZNotFrame;
let activeDrawGrid = true;

let half = 2;

let dataOutWindow = false;

let numOfDigitsAfterDot = 0;

let RGB = 256;

let HEX = 16;

let shiftCounterX = zero;
let shiftCounterY = zero;

// Имя файла для сохранения
let NAMEFILEFORSAVE = "";

// Имя файла для импорта/экспорта
let NAMEFILEFORIMPEXP = "";

let OK = 200;
let OKW = "205";          // данные успешно сохранены

/* Errors */
let LEVEL1 = 1;
let LEVEL2 = 2;
let LEVEL3 = 3;
let LEVEL4 = 4;
let LEVEL5 = 5;
let ER = 11;             // empty field in R
let EG = 12;             // empty field in G
let EB = 13;             // empty field in B
let ENUM = 14;           // not number
let ELEN = 15;           // string length
let EHEX = 16;           // not true code hex/empty field in HEX
let EMORENUM = 17;       // the figure should be higher
let ENOTTANDNUM = 18     // the title and number are not specified
let ENOTTWO = 19;        // not divisible by two without remainder
let ELESSTHANZERO = 20;  // less than zero
let ERESERVEDCLR = 21;   // reserved color

let EINCORRECTCOMMAND = "E89";  // неверная команда
let ENOJSON = "E34";            // нет json переменной
let EWRITE  = "E55";            // ошибка записи
let EREAD   = "E54";            // ошибка чтения
let EOPENFILE = "E58";          // не получилось открыть файл