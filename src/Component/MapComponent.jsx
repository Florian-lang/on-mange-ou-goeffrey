import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import HomeButton from './HomeButton';
import L from "leaflet";

const MapComponent = () => {
    const position = [45.159555, 1.533937];

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
