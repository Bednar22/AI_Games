import React, { useState, useEffect } from 'react';
import SingleSquare from './singleSquare';
import '../../App.css';

const MainBoard = () => {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState(true);
    const [end, setEnd] = useState(false);
    const [winner, setWinner] = useState('');
    const createBoard = (size) => {
        let boardlogic = new Array(size).fill(new Array(size));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                boardlogic[i][j] = '|';
            }
        }
        setBoard(boardlogic);
    };

    const setChar = (index) => {
        if (end === false) {
            let helpBoard = [...board[index[0]]];
            let helpBoard2 = [...board];

            if (helpBoard[index[1]] === '|') {
                if (turn === true) {
                    helpBoard[index[1]] = 'O';
                    setTurn(false);
                } else {
                    helpBoard[index[1]] = 'X';
                    setTurn(true);
                }
            } else {
                return;
            }
            helpBoard2[index[0]] = helpBoard;
            //console.table(helpBoard2);
            setBoard(helpBoard2);
        }
    };

    const checkVictory = () => {
        // sprawdzanie przekatnej \
        for (let i = 0; i < board.length - 2; i++) {
            for (let j = 0; j < board.length - 2; j++) {
                if (board[i][j] !== '|') {
                    if (board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2]) {
                        //console.log('JEJ PRZEKATNA \\');
                        setEnd(true);
                        return board[i][j];
                    }
                }
            }
        }
        // sprawdzanie pionu
        for (let i = 0; i < board.length - 2; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] !== '|') {
                    if (board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j]) {
                        //console.log('JEJ PION');
                        setEnd(true);
                        return board[i][j];
                    }
                }
            }
        }

        // sprawdzanie linii poziomych
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length - 2; j++) {
                if (board[i][j] !== '|') {
                    if (board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2]) {
                        //console.log('JEJ POZIOM');
                        setEnd(true);
                        return board[i][j];
                    }
                }
            }
        }

        //sprawdzanie przekatnych /
        for (let i = 0; i < board.length - 2; i++) {
            for (let j = 2; j < board.length; j++) {
                if (board[i][j] !== '|') {
                    if (board[i][j] === board[i + 1][j - 1] && board[i][j] === board[i + 2][j - 2]) {
                        //console.log('JEST PRZEKATNA');
                        setEnd(true);
                        return board[i][j];
                    }
                }
            }
        }
        return '';
    };

    useEffect(() => {
        createBoard(4);
    }, []);

    useEffect(() => {
        const win = checkVictory();
        setWinner(win);
    }, [board]);

    return (
        <>
            <div className='main-board'>
                {board.map((item, index) => {
                    return (
                        <div className='buttons-row'>
                            {item.map((item2, index2) => {
                                return (
                                    <SingleSquare
                                        squareInd={[index, index2]}
                                        char={item2}
                                        click={setChar}
                                    ></SingleSquare>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            {winner != '' ? (
                <div>
                    <h3> Zwycięzcą został gracz: {winner}</h3>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default MainBoard;
