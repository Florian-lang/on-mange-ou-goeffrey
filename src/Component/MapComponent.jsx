import {React, useState, useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import HomeButton from './HomeButton';
import axios from 'axios';
import PerimeterSelect from './PerimeterSelect';
import RandomPlaceButton from './RandomPlaceButton';
import ResetDataButton from './ResetDataButton';

const MapComponent = () => {
    const [coords, setCoords] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    const [perimeter, setPerimeter] = useState(1000);

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
        if (coords !== null) {
            const { latitude, longitude } = coords;
            const url = `https://overpass-api.de/api/interpreter?data=[out:json];(node[amenity=restaurant](around:${perimeter},${latitude},${longitude});node[amenity=fast_food](around:${perimeter},${latitude},${longitude});node[amenity=pub](around:${perimeter},${latitude},${longitude});node[shop=bakery](around:${perimeter},${latitude},${longitude}););out;`;

            axios.get(url).then((response) => {
                setRestaurants(response.data.elements);
            }).catch((error) => {
                console.error("Erreur lors de la récupération des informations du lieu:", error);
            });
        }
    }, [coords, perimeter]);

    const defaultPosition = [45.159555, 1.533937];
    const position = coords ? [coords.latitude, coords.longitude] : defaultPosition;

    if (isLoading) {
        return <p>Loading map...</p>;
    }

    const onPerimeterChange = (event) => {
        setPerimeter(event.target.value);
    };

    const onClickRandomPlace = () => {
        setRestaurants([restaurants[Math.floor(Math.random() * restaurants.length)]]);
    };

    const resetData = () => {
        setPerimeter(1000);
    };

    return (
        <>
            {coords && (
                <MapContainer center={position} zoom={20} className="h-screen w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}> 
                        <Popup>
                            Vous êtes ici 
                        </Popup>
                    </Marker>

                    {restaurants.map((restaurant) => (
                        <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lon]}>
                            <Popup>
                                {restaurant.tags.name}
                            </Popup>
                        </Marker>
                    ))}
                    
                    <div className="absolute left-4 bottom-4">
                        <HomeButton />
                    </div> 

                    <div className="absolute right-4 bottom-4">
                        <ResetDataButton setResetData={resetData}/>
                    </div> 

                    <div className="absolute right-4 top-4">
                        <PerimeterSelect selectedPerimeter={{perimeter}} onPerimeterChange={onPerimeterChange}/>
                    </div> 

                    <div className="absolute right-4 top-16"> 
                        <RandomPlaceButton getRandomPlace={onClickRandomPlace} />
                    </div>
                </MapContainer>
            )}
        </>
    );
};

export default MapComponent;
