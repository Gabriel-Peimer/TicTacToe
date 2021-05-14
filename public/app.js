let board = new Board();
let currentMarker = MARKER.x;
let otherMarker = MARKER.o;
const endGameElement = document.getElementById('game-end-container');
const winMessageElement = document.getElementById('win-message');
const replayButton = document.getElementById('replay-button');

function selectTile(location) {
    if (board.isLocationFull(location) == false) {
        // Only if it's the players turn
        if (currentMarker == MARKER.x) {
            board.placeMarker(location, MARKER.x);
            board.displayBoard();

            if (board.winCheck()) {
                displayWinMessage(currentMarker);
                currentMarker = null;
                return;
            } else if (board.fullBoardCheck()) {
                displayTieMessage();
                currentMarker = null;
                return;
            }

            [currentMarker, otherMarker] = [otherMarker, currentMarker];

            if (currentMarker != null) {
                // Make the bot move
                // const botMove = minimax(
                //     board.findAllMoves().length,
                //     false,
                //     board,
                //     -Infinity,
                //     Infinity
                // )[1];

                const botMove = bestMove(board);
                console.log(botMove);

                board.placeMarker(botMove, MARKER.o);

                board.displayBoard();

                if (board.winCheck()) {
                    displayWinMessage(currentMarker);
                    currentMarker = null;
                    return;
                }
            }

            [currentMarker, otherMarker] = [otherMarker, currentMarker];
        }
    }
}

function displayWinMessage(winMarker) {
    winMessageElement.innerText = winMarker + ' has won!';
    displayEndGameElements();
}

function displayTieMessage() {
    winMessageElement.innerText = "It's a tie!";
    displayEndGameElements();
}

function displayEndGameElements() {
    winMessageElement.style.display = 'inline-block';
    endGameElement.style.opacity = 1;
    endGameElement.style.transform = 'translate(-50%, -50%) scale(1)';
    replayButton.style.display = 'block';
}

function replay() {
    board.resetBoard();
    [currentMarker, otherMarker] = [MARKER.x, MARKER.o];
    board.displayBoard();
    endGameElement.style.opacity = 0;
    endGameElement.style.transform = 'translate(-50%, -50%) scale(0)';
    winMessageElement.style.display = 'none';
    replayButton.style.display = 'none';
}
