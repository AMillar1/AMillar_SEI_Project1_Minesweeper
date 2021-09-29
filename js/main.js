/*----- constants -----*/
let boardWidth = 4;
let boardHeight = 4;
let board;



/*----- app's state (variables) -----*/
//for each cell, tracking whether it is mined, 
// Board object and each of the cells. 
class Cell{
    constructor(row, col)  {
        this.isMined = false; //should be a bool
        this.isShown = false; //also a bool
        this.isFlagged = false; //yet another bool
        this.row = row;
        this.col = col;
        this.adjSum = 0;
    } 
    show() {
        this.isShown = true;
    }
 }

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const cellEls = [...document.querySelectorAll('#board > div')];

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleLeftClick);
//click on cell and ctrl-click on cell

init();
/*----- functions -----*/
function addMines(){
    let numMines = 8;
        while (numMines > 0) {
            let randCol = Math.floor(Math.random() * boardHeight); //generate a random col index
            let randRow = Math.floor(Math.random() * boardWidth); //generate a random row index
            if (board[randRow][randCol].isMined === false) {//check if the index is mined or not
            board[randRow][randCol].isMined = true; numMines--; //if it isnt mined, mine it and then decriment numMines
     }
    }  
    console.log(board);
    }

function init() {
    board = [];
    for (let row = 0; row < boardWidth; row++) {
        board.push([]);  // add row array
        for (let col = 0; col < boardHeight; col++) {
              let newCell = new Cell(row, col);
              board[row].push(newCell); //this creates the disired JS object 'board,' a 2D array with cell objects as base elements. 
        }
      }
    addMines();
      for (let row = 0; row < boardWidth; row++) {
        for (let col = 0; col < boardHeight; col++) {
              const cellDiv = document.createElement('div');
              cellDiv.id = `c${col}r${row}`;  
              boardEl.appendChild(cellDiv);
              if (board[row][col].isMined === true) {
                cellDiv.classList.add('mine')  //now we want to ALSO create a div corresponding that that cell. 
            }
        }
      }
    calcAdj();
}

function calcAdj() {
    for (let row = 0; row < boardWidth; row++) {
        for (let col = 0; col < boardHeight; col++) {//for every cell in the board array
            let counter = 0;
            // if (!board[row + 1] || !board[row + 1][col + 1] || !board[row - 1]) break;
            if (row < boardHeight - 1 && col < boardWidth - 1 && board[row + 1][col + 1].isMined === true) {//check SE extra conditions are for edge cells. All cells of the form 
                counter++;//increase the counter
            } 
            if (row < boardHeight - 1 && col > 0 && board[row + 1][col - 1].isMined === true) {// check SW 
                counter++;
            }
            if (row > 0 && col < boardWidth - 1 && board[row - 1][col + 1].isMined === true) {//  check NE
                counter++;
            }
            if (col > 0 && row > 0 && board[row - 1][col - 1].isMined === true) {// check NW
                counter++;
            }
            if (col < boardWidth - 1 && board[row][col + 1].isMined === true) {// check E
                counter++;
            }
            if (col > 0 && board[row][col - 1].isMined === true) {//check W
                counter++;
            }
            if (row > 0 && board[row - 1][col].isMined === true) {//check N
                counter++;
            }
            if (row < boardHeight - 1 && board[row + 1][col].isMined === true) {// check S
                counter++;
            } 
            console.log(counter);
        document.getElementById(`c${col}r${row}`).innerText = counter;
        }    
    }
}
function handleLeftClick(evt) {
    if (evt.target.isShown === false) {
        evt.target.isShown = true;
    }
    console.log(evt.target);
    console.log(board);
    // if (board[rowOfClicked].isShown === false) {
    //     isShown = true;
    // }
    // console.log(board);
}

//(board[row][col])

// if col > 0 // dont look W
// if row > 0 // dont look N
// if col < boardWidth - 1 // dont look E 
// if row < boardHeight - 1 // dont look S 