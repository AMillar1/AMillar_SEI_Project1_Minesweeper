/*----- constants -----*/
let boardWidth = 4;
let boardHeight = 4;
let board;



/*----- app's state (variables) -----*/
//for each cell, tracking whether it is mined, 
// Board object and each of the cells. 
class Cell{
    constructor(index1, index2){
        this.isMined = false; //should be a bool
        this.isShown = false; //also a bool
        this.isFlagged = false; //yet another bool
        //this.adjSum = foo; //This one will be quite a bit of code
        this.index1 = index1;
        this.index2 = index2;

    } 
    show() {
        this.isShown = true;
    }
    calcAdj() {
        
    }
 }

/*----- cached element references -----*/
const boardEl = document.getElementById('board');

/*----- event listeners -----*/
//click on cell and ctrl-click on cell

/*----- functions -----*/
init() ;
function init() {
    board = [];
    for (let row = 0; row < boardWidth; row++) {
        board.push([]);  // add row array
        for (let col = 0; col < boardHeight; col++) {
              let newCell = new Cell(row, col)
              board[row].push[newCell];
         }  // no semicolon at end of code blocks
      }
  }  // note there's no semicolon at end of fn declarations
  console.log(board);

// function init() {
//     board = [];
//   for (let i = 0; i < boardWidth; i++) {
//       for (let j = 0; j < boardHeight; j++) {
//             let newCell = new Cell(i, j)
//             board.push[newCell];
//         };
//     };     
// };
//render() ;



