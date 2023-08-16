import React from 'react';

const RandomPlaceButton = (props) => {
    console.log(props);
    return (
        <button onClick={props.getRandomPlace} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded z-400 relative">
            Je mange où ?
        </button>
    );
}

export default RandomPlaceButton;