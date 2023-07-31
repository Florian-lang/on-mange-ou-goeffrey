import React from 'react';

function HomeButton() {
    const handleGoToHomepage = () => {
        window.location.href = "/";
    };

    return (
        <button onClick={handleGoToHomepage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-400 relative">
            Retour à la page d'accueil
        </button>
    );
}

export default HomeButton;