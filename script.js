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

    function addPiece(row, column, playerMarker) {
        board[row][column].changeMarker(playerMarker);
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

    function changeMarker(playerMarker) {
        marker = playerMarker;
    }
    return {getMarker, changeMarker};
};


function createPlayer(name, marker) {
    let playerName = name;
    let playerMarker = marker;
    const getName = () => playerName;
    const getMarker = () => playerMarker;
    return {getName, getMarker}
}
const gameController = (function() {

    const player1 = createPlayer('jeff', 'x');
    const player2 = createPlayer('herb', 'o');

    let gameContinue = true;

    // set the current player
    let currentPlayer = player1;
    console.log(currentPlayer);

    function swapPlayer() {
        currentPlayer = currentPlayer.getMarker() == player1.getMarker() ? player2 : player1;
    }

    console.log('what does this uncover');
    // play a round
    function playRound() {

        function checkWin(board) {

            const markers = ['x','o']//not sure if this works 100%
            // const markers = ['x']
            for (let marker of markers) {
                for (let i = 0; i < 3; i++) {
                    console.log(`marker is ${marker}`)
                    if((board[i][0].getMarker() == marker) && (board[i][1].getMarker() == marker) && (board[i][2].getMarker() == marker)) {
                        console.log('win detected');
                        break
                    } else if ((board[0][i].getMarker() == marker) && (board[1][i].getMarker() == marker) && (board[2][i].getMarker() == marker)) {
                        console.log('win detected');
                        break
                    }
                }
            }
        }

        // while game is not over
        for (let i = 0; i< 6; i++) {
        // place a marker
            let row = prompt('row');
            let column = prompt('column');

            console.log(currentPlayer.getMarker());

            // check for valid play (ie not on filled position)
            // console.log(gameBoard.getBoard()[row][column].getMarker())
            if (gameBoard.getBoard()[row][column].getMarker() != '0') {
                console.log("space is currently filled, try again");
                alert("space is currently filled, try again");
                return;
            }


            gameBoard.addPiece(row, column, currentPlayer.getMarker());
            gameBoard.displayBoard();

            checkWin(gameBoard.getBoard()) ;
            swapPlayer();



        // update the board
        // check for a win condition
        // swap the current player
        }
    }

    playRound()
})();