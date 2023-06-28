// gameboard logic. It should get the board, change the board, and display the board.
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(cellLogic.getCell());
        }
        board.push(row);
    }
    console.log(board)

    function getBoard() {
        return board;
    }

    // put a piece anywhere that is currently empty. when placing a piece, modify that tile.
    function addPiece() {


    }

    function displayBoard() {

    }

});

// change cell contents and get current cell
const cellLogic = (() => {
    let cell = 'y';

    const getCell = () => cell;

    // obtain player marker
    const changeCell = {
        // cell = playerMarker;
    }
    return {getCell, changeCell};
})();

gameBoard();