import {React, useState, useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import HomeButton from './HomeButton';
import axios from 'axios';
import leaflet from 'leaflet';

const MapComponent = () => {
    const [coords, setCoords] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);

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

    const perimeter = 5000;
    const customIcon = leaflet.icon({iconUrl: 'marker-icon-red.png'});

    useEffect(() => {
        console.log("coords:", coords);
        if (coords !== null) {
            const { latitude, longitude } = coords;
            const url = `https://overpass-api.de/api/interpreter?data=[out:json];(node[amenity=restaurant](around:${perimeter},${latitude},${longitude});node[amenity=fast_food](around:${perimeter},${latitude},${longitude});node[amenity=pub](around:${perimeter},${latitude},${longitude});node[shop=bakery](around:${perimeter},${latitude},${longitude}););out;`;

            axios.get(url).then((response) => {
                setRestaurants(response.data.elements);
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
                    <Marker position={position}> Vous êtes ici </Marker>
                    {restaurants.map((restaurant) => (
                        <Marker icon={customIcon} key={restaurant.id} position={[restaurant.lat, restaurant.lon]}>
                            <Popup>
                                {restaurant.tags.name}
                            </Popup>
                        </Marker>
                    ))}
                    <div className="absolute left-4 bottom-4">
                        <HomeButton />
                    </div> 
                </MapContainer>
            )}
        </>
    );
};

export default MapComponent;
