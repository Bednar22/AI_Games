import React from 'react';
import '../../App.css';

const SingleSquare = (props) => {
    let buttonValue = '';
    return (
        <div>
            <button className='single-square'>{props.char}</button>
        </div>
    );
};

export default SingleSquare;
