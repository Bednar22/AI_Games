const player = 'X';
const opponent = 'O';

export const areMovesLeft = (hboard) => {
    let board = [...hboard];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == '|') {
                return true;
            }
        }
    }
    return false;
};

export const checkScore = (hboard) => {
    let board = [...hboard];
    // sprawdzanie przekatnej \
    for (let i = 0; i < board.length - 2; i++) {
        for (let j = 0; j < board.length - 2; j++) {
            if (board[i][j] !== '|') {
                if (board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2]) {
                    if (board[i][j] == player) {
                        return 10;
                    } else {
                        return -10;
                    }
                }
            }
        }
    }
    // sprawdzanie pionu
    for (let i = 0; i < board.length - 2; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] !== '|') {
                if (board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j]) {
                    if (board[i][j] == player) {
                        return 10;
                    } else {
                        return -10;
                    }
                }
            }
        }
    }

    // sprawdzanie linii poziomych
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length - 2; j++) {
            if (board[i][j] !== '|') {
                if (board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2]) {
                    if (board[i][j] == player) {
                        return 10;
                    } else {
                        return -10;
                    }
                }
            }
        }
    }

    //sprawdzanie przekatnych /
    for (let i = 0; i < board.length - 2; i++) {
        for (let j = 2; j < board.length; j++) {
            if (board[i][j] !== '|') {
                if (board[i][j] === board[i + 1][j - 1] && board[i][j] === board[i + 2][j - 2]) {
                    if (board[i][j] == player) {
                        return 10;
                    } else {
                        return -10;
                    }
                }
            }
        }
    }
    return 0;
};

export const minimax = (board, depth, isMax) => {
    let hboard = [...board];
    let score = checkScore(hboard);
    console.log(score);
    if (score === 10) {
        console.log('Wygrana');
        return score;
    }
    if (score === -10) {
        console.log('Przegrana');
        return score;
    }
    if (areMovesLeft(hboard) === false) {
        console.log('Brak ruchow');
        return 0;
    }
    if (isMax) {
        let best = -1000;
        for (let i = 0; i < hboard.length; i++) {
            for (let j = 0; j < hboard.length; j++) {
                if (hboard[i][j] === '|') {
                    hboard[i][j] = player;
                    best = Math.max(best, minimax(hboard, depth + 1, !isMax));
                    hboard[i][j] = '|';
                }
            }
        }
        return best;
    } else {
        let best = 1000;
        for (let i = 0; i < hboard.length; i++) {
            for (let j = 0; j < hboard.length; j++) {
                if (hboard[i][j] === '|') {
                    hboard[i][j] = opponent;
                    best = Math.min(best, minimax(hboard, depth + 1, !isMax));
                    hboard[i][j] = '|';
                }
            }
        }
        return best;
    }
}; //end of minmax func

export const findBestMove = (board) => {
    let hboard = [...board];
    let bestVal = -1000;
    let bestI = -1;
    let bestJ = -1;
    for (let i = 0; i < hboard.length; i++) {
        for (let j = 0; j < hboard.length; j++) {
            // Check if cell is empty
            if (hboard[i][j] == '|') {
                // Make the move
                hboard[i][j] = player;
                // compute evaluation function for this move.
                let moveVal = minimax(hboard, 0, false);
                // Undo the move
                hboard[i][j] = '|';
                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal > bestVal) {
                    bestI = i;
                    bestJ = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    console.log('BEST MOVE IS:', { bestVal }, 'OPTYMLNY RUCH:', { bestI, bestJ });
    return bestI, bestJ;
}; //end of findBestMove func
