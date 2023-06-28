// gameboard logic. It should get the board, change the board, and display the board.
const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];
    
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(createCell()); //pushes a cell object to a row
        }
        board.push(row);
    }

    function getBoard() {
        return board;
    }

    function addPiece(row, column) {
        console.log(board[row][column]);
        board[row][column].changeMarker();
        console.log(board[row][column]);
    }

    function displayBoard() {
        const test = board.map((row) => {
             return (row.map((cell) => {
                return cell.getMarker();
            }))
        })
        console.log(test)
    }

    return {addPiece, getBoard, displayBoard}
})();

// change cell contents and get current cell
function createCell() {
    let marker = '0';

    function getMarker() {
        return marker;
    };

    function changeMarker() {
        marker = 'x';
    }
    return {marker, getMarker, changeMarker};
};


gameBoard.addPiece(1,1)
gameBoard.displayBoard();