/*----- constants -----*/
let boardWidth = 8;
let boardHeight = 8;
let board;




/*----- app's state (variables) -----*/
//for each cell, tracking whether it is mined, 
// Board object and each of the cells. 
class Cell {
    constructor(row, col) {
        this.isMined = false;
        this.isShown = false;
        this.isFlagged = false;
        this.row = row;
        this.col = col;
        this.adjSum = 0;
    }
    show() {
        this.isShown = true;
        if (this.isMined) {
            winnerOrLose = 'L';
            for (let row = 0; row < boardHeight; row++) {
                for (let col = 0; col < boardWidth; col++) {
                    board[row][col].isShown = true;
                }
            }
        } 
    
    }
}
let cellEls;
let winnerOrLose; 

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
// const cellEls = [...document.querySelectorAll('#board > div')];


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleLeftClick);
document.getElementById('board').addEventListener('contextmenu', handleRightClick);

//click on cell and ctrl-click on cell

init();
/*----- functions -----*/
function addMines() {
    let numMines = 12;
    while (numMines > 0) {
        let randCol = Math.floor(Math.random() * boardHeight); //generate a random col index
        let randRow = Math.floor(Math.random() * boardWidth); //generate a random row index
        if (board[randRow][randCol].isMined === false) {//check if the index is mined or not
            board[randRow][randCol].isMined = true; numMines--; //if it isnt mined, mine it and then decriment numMines
        }
    }
}

function init() {
    winnerOrLose = null; 
    board = [];
    for (let row = 0; row < boardHeight; row++) {
        board.push([]);  // add row array
        for (let col = 0; col < boardWidth; col++) {
            let newCell = new Cell(row, col);
            board[row].push(newCell); //this creates the disired JS object 'board,' a 2D array with cell objects as base elements. 
        }
    }
    addMines();
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            const cellDiv = document.createElement('div');
            cellDiv.id = `c${col}r${row}`;
            boardEl.appendChild(cellDiv);
        }
    }
    calcAdj();
    cellEls = [...document.querySelectorAll('#board > div')];
    render();
}



function calcAdj() {
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {//for every cell in the board array
            let counter = 0;
            // if (!board[row + 1] || !board[row + 1][col + 1] || !board[row - 1]) break;
            if (row < boardHeight - 1 && col < boardWidth - 1 && board[row + 1][col + 1].isMined) {//check SE extra conditions are for edge cells. All cells of the form 
                counter++;//increase the counter
            }
            if (row < boardHeight - 1 && col > 0 && board[row + 1][col - 1].isMined) {// check SW 
                counter++;
            }
            if (row > 0 && col < boardWidth - 1 && board[row - 1][col + 1].isMined) {//  check NE
                counter++;
            }
            if (col > 0 && row > 0 && board[row - 1][col - 1].isMined) {// check NW
                counter++;
            }
            if (col < boardWidth - 1 && board[row][col + 1].isMined) {// check E
                counter++;
            }
            if (col > 0 && board[row][col - 1].isMined) {//check W
                counter++;
            }
            if (row > 0 && board[row - 1][col].isMined) {//check N
                counter++;
            }
            if (row < boardHeight - 1 && board[row + 1][col].isMined) {// check S
                counter++;
            }
            // document.getElementById(`c${col}r${row}`).innerText = counter; //put in innerHTML and toggle only that <h1>
            board[row][col].adjSum = counter;
        }
    }
}
function handleLeftClick(evt) {
    const id = evt.target.id;
    let colIdx = parseInt(id[1]);
    let rowIdx = parseInt(id[3]);
    if (id === 'board') return;
    if (!board[rowIdx][colIdx].isShown) {
        board[rowIdx][colIdx].show();
    }
    console.log(colIdx, rowIdx);
    render();
}
function handleRightClick(evt) {
    const index = cellEls.indexOf(evt.target);
    let colIdx = index % boardWidth;
    let rowIdx = Math.floor(index / boardHeight);
    console.log(colIdx, rowIdx);
    if (index === -1) return;
    if (board[colIdx][rowIdx].isFlagged === false) {
        board[colIdx][rowIdx].isFlagged = true;
    }
    render();
}


function render() {
    renderBoard();
    // renderMessaging();
}

function renderBoard() {
    cellEls.forEach(function (cellEl) {
        let id = cellEl.id;
        let colIdx = parseInt(id[1]);
        let rowIdx = parseInt(id[3]);
        let cell = board[rowIdx][colIdx];
        if (cell.isFlagged) {
            cellEl.className = 'flag';
        } else if (cell.isShown && !cell.isMined) {
            cellEl.innerText = (cell.adjSum === 0 ? '' : cell.adjSum);
            cellEl.className = 'shown';
        } else if (cell.isShown && cell.isMined) {
            cellEl.className = 'mine';
        } else {
            cellEl.className = 'covered';
        }
    });
}
