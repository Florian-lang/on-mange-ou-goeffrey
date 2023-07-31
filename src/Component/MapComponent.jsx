import {React, useState, useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import HomeButton from './HomeButton';
import axios from 'axios';

const MapComponent = () => {
    const [coords, setCoords] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [placeInfo, setPlaceInfo] = useState(null);

    useEffect(() => {
        const fetchLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCoords({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        setIsLoading(false);
                    }, (error) => {
                        console.error("Error getting user's location:", error);
                        setIsLoading(false);
                    },

                    { enableHighAccuracy: false, timeout: 5000 }
                );  
            } else {
                console.error("Geolocation is not available in this browser.");
                setIsLoading(false);
            }
        };
    
        fetchLocation();
    }, []);


    useEffect(() => {
        console.log("coords:", coords);
        if (coords !== null) {
            const { latitude, longitude } = coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
        
            axios.get(url).then((response) => {
                setPlaceInfo(response.data);
            }).catch((error) => {
                console.error("Erreur lors de la récupération des informations du lieu:", error);
            });
        }
    }, [coords]);

    const defaultPosition = [45.159555, 1.533937];
    const position = coords ? [coords.latitude, coords.longitude] : defaultPosition;

    if (isLoading) {
        return <p>Loading map...</p>;
    }

    return (
        <>
            {coords && (
                <MapContainer center={position} zoom={20} className="h-screen w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}>
                    {placeInfo && (
                        <Popup>
                            <div>
                                <h3>{placeInfo.display_name}</h3>
                                <p>Latitude: {coords.latitude}</p>
                                <p>Longitude: {coords.longitude}</p>
                            </div>
                        </Popup>
                    )}
                    </Marker>
                    <div className="absolute left-4 bottom-4">
                        <HomeButton />
                    </div> 
                </MapContainer>
            )}
        </>
    );
};

export default MapComponent;
