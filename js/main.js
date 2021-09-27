/*----- constants -----*/
let boardWidth = 4;
let boardHeight = 4;
let board;



/*----- app's state (variables) -----*/
//for each cell, tracking whether it is mined, 
// Board object and each of the cells. 
class Cell{
    constructor(row, col){
        this.isMined = false; //should be a bool
        this.isShown = false; //also a bool
        this.isFlagged = false; //yet another bool
        //this.adjSum = foo; //This one will be quite a bit of code
        this.row = row;
        this.col = col;
    } 
    show() {
        this.isShown = true;
    }
    calcAdj() {    
    }
    placeMine(){
        this.isMined = true;
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
              let newCell = new Cell(row, col);
              board[row].push(newCell);
         }  
      }
// now to randomly mine some cells. 
    let numMines = 1;
    while (numMines > 0) {
        let randCol = Math.floor(Math.random()) * 4;
        let randRow = Math.floor(Math.random()) * 4;
        if (board[randRow][randCol].isMined === false) {
            board[randRow][randCol].isMined = true;
            numMines--;
        }
     }
  }  // note there's no semicolon at end of fn declarations
  console.log(board);

  new Cell(1,2);
  console.log()






