import React, { useState } from 'react';
import MapComponent from '../Component/MapComponent';
import HomeComponent from '../Component/HomeComponent';

const Home = () => {
    const [showMap, setShowMap] = useState(false);

    const handleEnterClick = () => {
        setShowMap(true);
    }

    return (
        <div className="home-container">
            {showMap ? 
            (
                <MapComponent/>
            ) : 
            ( 
                <HomeComponent
                    enterClick={handleEnterClick}
                />
            )}
        </div> 
    );
};

export default Home;
