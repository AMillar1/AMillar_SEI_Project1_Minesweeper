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
        this.isShown = true; //also a bool
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
              board[row].push(newCell); //this creates the disired JS object 'board,' a 2D array with cell objects as base elements. 
              const cellDiv = document.createElement('div');
              cellDiv.id = `c${row}r${col}`;  
              boardEl.appendChild(cellDiv);//now we want to ALSO create a div corresponding that that cell. 
            }  
      }
// now to randomly mine some cells. 
let numMines = 7;
    while (numMines > 0) {
        let randCol = Math.floor(Math.random() * boardHeight); //generate a random col index
        let randRow = Math.floor(Math.random() * boardWidth); //generate a random row index
        if (board[randRow][randCol].isMined === false) {//check if the index is mined or not
        board[randRow][randCol].isMined = true; numMines--; //if it isnt mined, mine it and then decriment numMines
 }
}  
console.log(board);
}

// function renderBoard() {
//     board.forEach(function(rowArr, col) {
//         rowArr.forEach(function(cell, row) {
//             const cellDiv = document.createElement('div');
//             cellDiv.id = `r${row}c${col}`;
//             boardEl.appendChild(cellDiv);
//         });
//     });
// }