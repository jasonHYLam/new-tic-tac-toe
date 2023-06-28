const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        console.log('x')
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push('x');
        }
        board.push(row);
    }
    console.log(board)
})

gameBoard();