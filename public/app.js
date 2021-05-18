let board = new Board();
const endGameElement = document.getElementById('game-end-container');
const winMessageElement = document.getElementById('win-message');
const replayButton = document.getElementById('replay-button');

let playerMarker;
let botMarker;
let currentMarker = MARKER.x;
let otherMarker = MARKER.o;

function chooseRandomMarker() {
    const randomChoice = Math.floor(Math.random() * 2);
    if (randomChoice == 0) {
        playerMarker = MARKER.x;
        botMarker = MARKER.o;
    } else {
        playerMarker = MARKER.o;
        botMarker = MARKER.x;
    }
}

chooseRandomMarker();

if (currentMarker == botMarker) {
    makeBotMove();
    board.displayBoard();
    [currentMarker, otherMarker] = [otherMarker, currentMarker];
}

function selectTile(location) {
    if (board.isLocationFull(location) == false) {
        // Only if it's the players turn
        if (currentMarker == playerMarker) {
            board.placeMarker(location, playerMarker);
            board.displayBoard();

            if (board.winCheck()) {
                displayWinMessage(playerMarker);
                playerMarker = null;
                return;
            } else if (board.fullBoardCheck()) {
                displayTieMessage();
                currentMarker = null;
                return;
            }

            [currentMarker, otherMarker] = [otherMarker, currentMarker];

            if (currentMarker == botMarker) {
                makeBotMove();
                board.displayBoard();

                if (board.winCheck()) {
                    displayWinMessage(botMarker);
                    currentMarker = null;
                    return;
                } else if (board.fullBoardCheck()) {
                    displayTieMessage();
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

    chooseRandomMarker();

    if (currentMarker == botMarker) {
        makeBotMove();
        board.displayBoard();
        [currentMarker, otherMarker] = [otherMarker, currentMarker];
    }
}

function makeBotMove() {
    const botMove = bestMove(board, botMarker);
    board.placeMarker(botMove, botMarker);
}
