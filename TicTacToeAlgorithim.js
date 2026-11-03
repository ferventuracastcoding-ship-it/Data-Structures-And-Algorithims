
const board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let gameFinished = false;

// Display board
function displayBoard() {

    console.log(
        board.slice(0, 3).join(" | ") + "\n" +
        "---------\n" +
        board.slice(3, 6).join(" | ") + "\n" +
        "---------\n" +
        board.slice(6, 9).join(" | ")
    );
}

// Check winning combinations
function checkWinner(b) {

    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b1, c] of wins) {

        if (
            b[a] &&
            b[a] === b[b1] &&
            b[a] === b[c]
        ) {
            return b[a];
        }
    }

    return null;
}

// Check available positions
function getAvailableMoves(b) {

    return b
        .map((value, index) =>
            value === "" ? index : null
        )
        .filter(index => index !== null);
}

// Minimax AI algorithm
function minimax(b, depth, isMaximizing) {

    const winner = checkWinner(b);

    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth;

    const moves = getAvailableMoves(b);

    if (moves.length === 0) return 0;

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (const move of moves) {

            b[move] = "O";

            const score = minimax(
                b,
                depth + 1,
                false
            );

            b[move] = "";

            bestScore = Math.max(bestScore, score);
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (const move of moves) {

            b[move] = "X";

            const score = minimax(
                b,
                depth + 1,
                true
            );

            b[move] = "";

            bestScore = Math.min(bestScore, score);
        }

        return bestScore;
    }
}

// Computer selects best move
function computerMove() {

    let bestScore = -Infinity;
    let bestMove = null;

    for (const move of getAvailableMoves(board)) {

        board[move] = "O";

        const score = minimax(
            board,
            0,
            false
        );

        board[move] = "";

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    if (bestMove !== null) {
        board[bestMove] = "O";
    }
}

// Player makes a move
function playerMove(position) {

    if (
        gameFinished ||
        position < 0 ||
        position > 8 ||
        !Number.isInteger(position) ||
        board[position] !== ""
    ) {
        return;
    }

    board[position] = "X";

    let winner = checkWinner(board);

    if (winner) {
        gameFinished = true;
        console.log("Winner:", winner);
        displayBoard();
        return;
    }

    if (getAvailableMoves(board).length === 0) {
        gameFinished = true;
        console.log("DRAW!");
        displayBoard();
        return;
    }

    computerMove();

    winner = checkWinner(board);

    if (winner) {
        gameFinished = true;
        console.log("Winner:", winner);
    } else if (getAvailableMoves(board).length === 0) {
        gameFinished = true;
        console.log("DRAW!");
    }

    displayBoard();
}

// Reset game
function resetGame() {

    board.fill("");

    currentPlayer = "X";
    gameFinished = false;

    displayBoard();
}

// Example game
displayBoard();

// Player selects position 4
playerMove(4);
