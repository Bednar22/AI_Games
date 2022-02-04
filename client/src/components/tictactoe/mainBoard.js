import React, { useState, useEffect } from 'react';
import SingleSquare from './singleSquare';
import '../../App.css';

const MainBoard = () => {
    const [boardUI, setBoardUI] = useState([]);
    const [board, setBoard] = useState([]);

    const createBoard = (size) => {
        let helpArray = new Array(size).fill(<SingleSquare></SingleSquare>);
        let newBoard = new Array(size).fill(helpArray);
        let boardlogic = new Array(size).fill(new Array(size));
        setBoardUI(newBoard);
        setBoard(boardlogic);
    };

    const setChar = (char) => {
        boardUI[0][0] = <SingleSquare char={char}></SingleSquare>;
        board[0][0] = char;
        console.log(board);
    };

    useEffect(() => {
        createBoard(3);
    }, []);

    return (
        <>
            {boardUI};{setChar('k')}
        </>
    );
};

export default MainBoard;
