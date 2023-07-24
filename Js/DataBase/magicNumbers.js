let zero = 0, one = 1, two = 2, three = 3;

// без рамки
let cellSZNotFrame = 23;
let activeDrawGrid = true;

let half = 2;

let canvasWidthCell = Math.floor(canvasWidth / cellSZNotFrame);
let canvasHeightCell = Math.floor(canvasHeight / cellSZNotFrame);

let dataOutWindow = false;

let numOfDigitsAfterDot = 0;

let RGB = 256;

let HEX = 16;

let shiftCounterX = zero;
let shiftCounterY = zero;


let OK = 200;

/* Errors */
let LEVEL1 = 1;
let LEVEL2 = 2;
let LEVEL3 = 3;
let LEVEL4 = 4;
let LEVEL5 = 5;
let ER = 11;      // empty field in R
let EG = 12;      // empty field in G
let EB = 13;      // empty field in B
let ENUM = 14;    // not number
let ELEN = 15;    // string length
let EHEX = 16;    // not true code hex/empty field in HEX
let ENOTTWO = 19; // not divisible by two without remainder