const scores = {
    X: -1,
    O: 1,
    tie: 0
}

function minimax(depth, board, maximizingPlayer) {
    let result = board.findWinner();
    if (result !== null) {
        let score = scores[result];
        return score;
    }

    if (maximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.board.length; i++) {
            const move = i;
            if (board.isLocationFull(move) == false) {
                board.placeMarker(move, MARKER.o);
                const score = minimax(depth + 1, board, false);
                board.removeMarker(move);
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < board.board.length; i++) {
            const move = i;
            if (board.isLocationFull(move) == false) {
                board.placeMarker(move, MARKER.x);
                const score = minimax(depth + 1, board, true);
                board.removeMarker(move);
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

function bestMove(board) {
    let bestScore = -Infinity;
    let bestMove

    for (let i = 0; i < board.board.length; i++) {
        const move = i;

        if (board.isLocationFull(move) == false) {
            board.placeMarker(move, MARKER.o);
            let score = minimax(0, board, false);
            board.removeMarker(move);
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
    }
    return bestMove;
}
