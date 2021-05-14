class Board {
    constructor() {
        this.board = [
            null, null, null, 
            null, null, null, 
            null, null, null
        ];
    }

    displayBoard() {
        console.log(`${this.board[0]}, ${this.board[1]}, ${this.board[2]}`);
        console.log(`${this.board[3]}, ${this.board[4]}, ${this.board[5]}`);
        console.log(`${this.board[6]}, ${this.board[7]}, ${this.board[8]}`);
        for (let i = 0; i < this.board.length; i++) {
            const marker = this.board[i];
            document.getElementById(`${i}`).innerText = marker;
        }
    }

    resetBoard() {
        this.board = [
            null, null, null, 
            null, null, null, 
            null, null, null
        ];
    }

    isLocationFull(location) {
        return this.board[location] != null;
    }

    placeMarker(location, marker) {
        this.board[location] = marker;
    }

    removeMarker(location) {
        this.board[location] = null;
    }

    winCheck() {
        const listOfWins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // vertical
            [0, 4, 8], [2, 4, 6]  // diagonal
        ];

        for (let i = 0; i < listOfWins.length; i++) {
            const winArray = listOfWins[i];
            
            if (this.isLocationFull(winArray[0])) {
                if (this.board[winArray[0]] == this.board[winArray[1]] &&
                    this.board[winArray[0]] == this.board[winArray[2]]) {
                    return true;
                }
            }
        }
        return false;
    }

    findWinner() {
        const listOfWins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // vertical
            [0, 4, 8], [2, 4, 6]  // diagonal
        ];

        for (let i = 0; i < listOfWins.length; i++) {
            const winArray = listOfWins[i];
            
            if (this.isLocationFull(winArray[0])) {
                if (this.board[winArray[0]] == this.board[winArray[1]] &&
                    this.board[winArray[0]] == this.board[winArray[2]]) {
                        return this.board[winArray[0]];
                }
            }
        }
        if (this.fullBoardCheck()) {
            return "tie";
        }
        return null;
    }

    fullBoardCheck() {
        for (let i = 0; i < this.board.length; i++) {
            if (this.isLocationFull(i) == false) {
                return false;
            }
        }
        return true
    }

    findAllMoves() {
        let moveArray = [];
        for (let i = 0; i < this.board.length; i++) {
            if (this.isLocationFull(i) == false) {
                moveArray.push(i);
            }
        }
        return moveArray;
    }
}
