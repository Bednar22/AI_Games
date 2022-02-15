import React, { useState, useEffect } from 'react';
import SingleSquare from './singleSquare';
import '../../App.css';
import { areMovesLeft, checkScore, minimax, findBestMove } from './minimax';
const MainBoard = () => {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState(true);
    const [end, setEnd] = useState(false);
    const [winner, setWinner] = useState('');
    const player = 'X';
    const opponent = 'O';
    let boardExp = [
        ['X', 'O', 'X'],
        ['O', 'O', 'X'],
        ['|', '|', '|'],
    ];

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

    useEffect(() => {
        createBoard(3);
        findBestMove(boardExp);
    }, []);

    useEffect(() => {
        console.log('Czy sa jeszcze ruchy?', areMovesLeft(board));
        const win = checkScore(board);
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
