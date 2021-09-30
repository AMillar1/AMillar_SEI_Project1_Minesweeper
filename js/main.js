/*----- constants -----*/
let boardWidth = 8;
let boardHeight = 8;
let board;
const winPlayer = new Audio('https://audio-previews.elements.envatousercontent.com/files/111184960/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22K3RTHA7-game-win-horns.mp3%22');




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
        this.neighbors = [];
    }
    show() {
        this.isShown = true;
        this.isFlagged = false;
        if (this.isMined) {
            winnerOrLose = 'L';
            for (let row = 0; row < boardHeight; row++) {
                for (let col = 0; col < boardWidth; col++) {
                    board[row][col].isShown = true;
                    board[row][col].isFlagged = false;
                }
            }
        } else {
            let winner = true;
            for (let row = 0; row < boardHeight; row++) {
                for (let col = 0; col < boardWidth; col++) {
                    if (!((board[row][col].isFlagged && board[row][col].isMined) || board[row][col].isShown)) {
                        winner = false;
                        break;
                    }
                }   
                if (!winner) break;
            }
            if (winner) winnerOrLose = 'W';
        }
        if (this.adjSum === 0) {
            this.neighbors.forEach(function(neighbor) {
                if (!neighbor.isShown && !neighbor.isMined) neighbor.show();
            })
        }
    }
}
let cellEls;
let winnerOrLose;

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const messageEl = document.querySelector('h1');


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleLeftClick);
document.getElementById('board').addEventListener('contextmenu', handleRightClick);

init();
/*----- functions -----*/
function addMines() {
    let numMines = 8;
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
            if (row < boardHeight - 1 && col < boardWidth - 1) {
                board[row][col].neighbors.push(board[row + 1][col + 1]);//checK SE
                if (board[row + 1][col + 1].isMined) counter++;
            }
            if (row < boardHeight - 1 && col > 0) {
                board[row][col].neighbors.push(board[row + 1][col - 1]);// check SW 
                if (board[row + 1][col - 1].isMined) counter++;   
            }
            if (row > 0 && col < boardWidth - 1) {//  check NE
                board[row][col].neighbors.push(board[row - 1][col + 1]);
                if (board[row - 1][col + 1].isMined) counter++;
            }
            if (col > 0 && row > 0) {// check NW
                board[row][col].neighbors.push(board[row - 1][col - 1]);
                if (board[row - 1][col - 1].isMined) counter++;
            }
            if (col < boardWidth - 1) {// check E
                board[row][col].neighbors.push(board[row][col + 1]);
                if (board[row][col + 1].isMined) counter++;
            }
            if (col > 0) {//check W
                board[row][col].neighbors.push(board[row][col - 1]);
                if (board[row][col - 1].isMined) counter++;
            }
            if (row > 0) {//check N
                board[row][col].neighbors.push(board[row - 1][col]);
                if (board[row - 1][col].isMined) counter++;
            }
            if (row < boardHeight - 1) {// check S
                board[row][col].neighbors.push(board[row + 1][col]);
                if (board[row + 1][col].isMined) counter++;
            }
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
    render();
}
function handleRightClick(evt) {
    evt.preventDefault();
    const id = evt.target.id;
    let colIdx = parseInt(id[1]);
    let rowIdx = parseInt(id[3]);
    if (id === 'board') return;
    board[rowIdx][colIdx].isFlagged = !board[rowIdx][colIdx].isFlagged;
    //audioFX
    render();
}
function render() {
    renderBoard();
    renderMessaging();
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
function renderMessaging() {
    if (winnerOrLose === 'L') {
        messageEl.innerText = 'Kaboom!';
    } else if (winnerOrLose === 'W') {
        messageEl.innerText = 'Victory!';
        winPlayer.play();
    } else {
        messageEl.innerText = 'Be Careful!';
    }
}