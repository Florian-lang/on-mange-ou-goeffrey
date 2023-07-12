import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import HomeButton from './HomeButton';

const MapComponent = () => {
    return (
        <>
            <MapContainer center={[45.159555, 1.533937]} zoom={13} className="h-screen w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>

            <HomeButton/>
        </>
    );
};

export default MapComponent;
