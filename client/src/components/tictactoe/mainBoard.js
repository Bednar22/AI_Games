import React, { useState, useEffect } from 'react';
import SingleSquare from './singleSquare';
import '../../App.css';

const MainBoard = () => {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState(true);

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
        console.table(helpBoard2);
        setBoard(helpBoard2);
    };

    const checkVictory = () => {
        let now = 'I';
        let before = 'I';
        let count = 0;
        let helpBoard = [...board];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {}
        }
    };

    useEffect(() => {
        createBoard(4);
    }, []);

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
        </>
    );
};

export default MainBoard;
