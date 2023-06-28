console.log('h');
// gameboard lonsogic. It should get the board, change the board, and display the board.
const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(cellLogic());
        }
        board.push(row);
    }
    console.log(board)

    function getBoard() {
        return board;
    }

    // put a piece anywhere that is currently empty. when placing a piece, modify that tile.
    // requires row and column
    function addPiece(row, column) {
        let cellToModify = board[row][column];
        cellToModify = 'hh';
    }

    function displayBoard() {

    }

    return {addPiece, getBoard}
})();

// change cell contents and get current cell
function cellLogic() {
    let cell = '0';

    function getCell() {
        return cell
    };

    // obtain player marker
    function changeCell() {
        // cell = playerMarker;
        cell = 'x';
    }
    return {getCell, changeCell};
};

gameBoard.getBoard();
