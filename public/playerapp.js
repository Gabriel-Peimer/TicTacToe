let board = new Board();
const endGameElement = document.getElementById('game-end-container');
const winMessageElement = document.getElementById('win-message');
const replayButton = document.getElementById('replay-button');

let currentMarker = MARKER.x;
let otherMarker = MARKER.o;

function selectTile(location) {
    if (board.isLocationFull(location) == false) {
        board.placeMarker(location, currentMarker);
        board.displayBoard();

        if (board.winCheck()) {
            displayWinMessage(currentMarker);
            playerMarker = null;
            return;
        } else if (board.fullBoardCheck()) {
            displayTieMessage();
            currentMarker = null;
            return;
        }

        [currentMarker, otherMarker] = [otherMarker, currentMarker];
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
