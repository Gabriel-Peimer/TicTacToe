scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimax(depth, board, maximizingPlayer) {
    let result = board.findWinner();
    if (result !== null) {
        return scores[result];
    }

    if (maximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.board.length; i++) {
            const location = i;
            if (board.isLocationFull(location) == false) {
                board.placeMarker(location, MARKER.x);
                const score = minimax(depth + 1, board, false);
                board.removeMarker(location);
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < board.board.length; i++) {
            const location = i;
            if (board.isLocationFull(location) == false) {
                board.placeMarker(location, MARKER.o);
                const score = minimax(depth + 1, board, true);
                board.removeMarker(location);
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

function bestMove(board, botMarker) {
    const isMaximizing = (botMarker == MARKER.x) ? true : false;
    let bestScore = (isMaximizing) ? -Infinity : Infinity;
    let bestMove;

    for (let i = 0; i < board.board.length; i++) {
        const move = i;

        if (board.isLocationFull(move) == false) {
            board.placeMarker(move, botMarker);
            const score = minimax(0, board, !isMaximizing);
            board.removeMarker(move);
            if (isMaximizing) {
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            else {
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
        }
    }
    return bestMove;
}
