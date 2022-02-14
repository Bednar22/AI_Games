import React, { useState } from 'react';
import '../../App.css';

const SingleSquare = (props) => {
    const [textColor, setTextColor] = useState('white');

    const singleSquareClick = () => {
        setTextColor('black');
        props.click(props.squareInd);
    };

    return (
        <button className='single-square' style={{ color: textColor }} onClick={() => singleSquareClick()}>
            {props.char}
        </button>
    );
};

export default SingleSquare;
