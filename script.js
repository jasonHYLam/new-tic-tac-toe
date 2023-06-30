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

    //used when restarting the game. need to reset game state
    function resetBoard() {
        board.map((row) => {
            return row.map((cell) => {
                return cell.changeMarker("");
            })
        })
    }



    // used to display the board in console
    function displayBoard() {
        const test = board.map((row) => {
             return (row.map((cell) => {
                return cell.getMarker();
            }))
        })
        console.log(test)
    }

    return {addPiece, getBoard, displayBoard, resetBoard}
})();

// factory function to change cell contents and get current cell
function createCell() {
    let marker = '';

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
    let gameWin = false;

    // set the current player
    let currentPlayer = player1;

    function resetGameState() {
        gameContinue = true;
        gameWin = false;
        currentPlayer = player1;
    }

    function swapPlayer() {
        currentPlayer = currentPlayer.getMarker() == player1.getMarker() ? player2 : player1;
    }

    // play a round
    function playGame(row, column) {

        function checkWin(board) {

            const markers = ['x','o']

            mainLoop:
            for (let marker of markers) {

                // check leading diagonal if there is a win
                if ((board[0][0].getMarker() == marker) && (board[1][1].getMarker() == marker) && (board[2][2].getMarker() == marker)) {
                        gameContinue = false;
                        gameWin = true;
                        break mainLoop;

                // check non-leading diagonal if there is a win
                } else if ((board[2][0].getMarker() == marker) && (board[1][1].getMarker() == marker) && (board[0][2].getMarker() == marker)) {
                        gameContinue = false;
                        gameWin = true;
                        break mainLoop;

                }
                // check rows if there is a win
                for (let i = 0; i < 3; i++) {

                    if((board[i][0].getMarker() == marker) && (board[i][1].getMarker() == marker) && (board[i][2].getMarker() == marker)) {
                        gameContinue = false;
                        gameWin = true;
                        break mainLoop;
                        
                    // check columns if there is a win
                    } else if ((board[0][i].getMarker() == marker) && (board[1][i].getMarker() == marker) && (board[2][i].getMarker() == marker)) {
                        gameContinue = false;
                        gameWin = true;
                        break mainLoop;
                    } 
                }
            }
        }

        function checkDraw(board) {

            //the expression determines whether all spaces are filled. If so, end the game.
            let allSpacesFilled = false;
            allSpacesFilled = board.every((row) => {
                return row.every((cell) => {
                    return cell.getMarker() != "";
                });
            })
            if (allSpacesFilled) {
                gameContinue = false;
            }
        }

        //disable game if gameWin is true
        if (gameContinue) {
            // prevent play if user clicks on non-empty space
            if (gameBoard.getBoard()[row][column].getMarker() != '') {
                return;
            }
            gameBoard.addPiece(row, column, currentPlayer.getMarker());
            gameBoard.displayBoard();

            checkWin(gameBoard.getBoard());

            // while there is no winner, check for draw and swap player until the last possible move.
            if (!gameWin) {
                checkDraw(gameBoard.getBoard());
                swapPlayer();
            }

            if (gameContinue == false && gameWin == false) {
                displayController.alertEnd('draw')
                displayController.showElement("#reset-button");
            } else if (gameContinue == false && gameWin == true) {
                displayController.alertEnd(currentPlayer.getName())
                displayController.showElement("#reset-button");
            }
        }
    }

    return {playGame, resetGameState};
})();

const displayController = (function() {

    // board construction
    function createBoardDOM() {
        let boardContainer = document.querySelector("#board-container");
        const rows = 3;
        const columns = 3;
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = "board-row";
            boardContainer.appendChild(row);
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('button');
                cell.className = "board-cell";
                cell.setAttribute("data-row", i)
                cell.setAttribute("data-column",j)
                // not sure if this works
                cell.textContent =gameBoard.getBoard()[i][j].getMarker();
                row.appendChild(cell);
            }
        }
    }

    function removeBoardDOM() {
        let boardContainer = document.querySelector("#board-container");
        while (boardContainer.lastChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }
    }

    function updateBoardDOM() {
        removeBoardDOM();
        createBoardDOM();
    }

    function getBoardContainer() {
        return document.querySelector("#board-container")
    }

    function resetEndGameText() {
        const textContainer = document.querySelector("#text-container");
        textContainer.textContent = "";
    }

    function clickHandler() {
        // handle clicks on cell buttons
        const boardContainer = getBoardContainer();
        boardContainer.addEventListener('click', (e) => {
            if (e.target.tagName == "BUTTON") {
                gameController.playGame(e.target.dataset.row, e.target.dataset.column);
                updateBoardDOM();
            }
        })

        // handle clicks on play again button
        const resetButton = document.querySelector("#reset-button");
        resetButton.addEventListener('click', () => {
            gameBoard.resetBoard()
            gameController.resetGameState();
            resetEndGameText();
            hideElement("#text-container");
            hideElement("#reset-button");
            updateBoardDOM();
        })
    }

    function alertEnd(name) {
        const textContainer = document.querySelector("#text-container");
        if (name == 'draw') {
            textContainer.textContent = "it's a draw"
        } else {
            textContainer.textContent = `${name} has won.`
        }
    }

    function hideElement(name) {
        const elementToHide = document.querySelector(name) 
        elementToHide.classList.add("hidden");
    }

    function showElement(name) {
        const elementToShow = document.querySelector(name) 
        elementToShow.classList.remove("hidden");

    }

    // initialise the board DOM and clickHandler
    createBoardDOM();
    hideElement("#reset-button");
    clickHandler();

    return {alertEnd, showElement}
})();