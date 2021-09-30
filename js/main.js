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
    }
}

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
    let numMines = 32;
    while (numMines > 0) {
        let randCol = Math.floor(Math.random() * boardHeight); //generate a random col index
        let randRow = Math.floor(Math.random() * boardWidth); //generate a random row index
        if (board[randRow][randCol].isMined === false) {//check if the index is mined or not
            board[randRow][randCol].isMined = true; numMines--; //if it isnt mined, mine it and then decriment numMines
        }
    }
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
                cellDiv.classList.add('mine')
            }
        }
    }
    calcAdj();
}
const cellEls = [...document.querySelectorAll('#board > div')];


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
            // document.getElementById(`c${col}r${row}`).innerText = counter; //put in innerHTML and toggle only that <h1>
            board[col][row].adjSum = counter; 
        }
    }
}
function handleLeftClick(evt) {
    const index = cellEls.indexOf(evt.target);
    let colIdx = index % boardWidth;
    let rowIdx = Math.floor(index / boardHeight);
    console.log(colIdx, rowIdx);
    if (index === -1) return;
    if (board[colIdx][rowIdx].isShown === false) {
        board[colIdx][rowIdx].isShown = true;
    }
    console.log(board);
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
    console.log(board);
    render();
}


function render() {
    renderBoard();
    // renderMessaging();
}

function renderBoard() {
    cellEls.forEach(function(cell) {
        let index = cellEls.indexOf(cell);
        let domCell = board[index % boardWidth][Math.floor(index / boardHeight)];
        if (domCell.isFlagged === true) {
            cell.classList.add('flag');
        } else if (domCell.isShown && !domCell.isMined) {
            cell.innertext = domCell.adjSum;
            console.log(cell);
        }
    })
}