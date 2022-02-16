import React, { useState, useEffect } from 'react';
import '../../App.css';

const SingleSquare = (props) => {
    const [textColor, setTextColor] = useState('white');

    const singleSquareClick = () => {
        //setTextColor('black');
        props.click(props.squareInd);
    };

    useEffect(() => {
        if (props.char != '|') {
            setTextColor('black');
        }
    }, [props.char]);

    return (
        <button className='single-square' style={{ color: textColor }} onClick={() => singleSquareClick()}>
            {props.char}
        </button>
    );
};

export default SingleSquare;
