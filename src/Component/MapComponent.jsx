import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import HomeButton from './HomeButton';
import { useGeolocated } from "react-geolocated";


const MapComponent = () => {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const defaultPosition = [45.159555, 1.533937];
    const position = coords ? [coords.latitude, coords.longitude] : defaultPosition;

    return (
        <>
            <MapContainer center={position} zoom={13} className="h-screen w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                    <Popup>
                        Vous êtes ici
                    </Popup>
                </Marker>
            </MapContainer>

            <HomeButton/>
        </>
    );
};

export default MapComponent;
