import React from 'react';

function HomeButton() {
    const handleClick = () => {
        window.location.href = '/';
    };

    return (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded" onClick={handleClick}>Retour à la page d'accueil</button>
    );
}

export default HomeButton;