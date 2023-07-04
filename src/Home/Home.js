import React, { useState, useRef } from 'react';
import logo from '../Images/goeffrey.PNG'
import MapComponent from '../Component/MapComponent';

const Home = () => {
    const [showMap, setShowMap] = useState(false);
    const mapRef = useRef(null);

    const handleEnterClick = () => {
        setShowMap(true);
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 100);
        }
    }

    return (
        <div className="home-container">
            {showMap ? 
            (
                <MapComponent/>
            ) : 
            ( 
                <>
                    <h1 className="title">On mange où Goeffrey ? </h1>
                    <img className='logo' src={logo}/>
                    <button className="enter-button" onClick={handleEnterClick}>
                        Entrer
                    </button>
                </>
            )}
        </div> 
    );
};

export default Home;
