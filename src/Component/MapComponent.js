import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../index.css';

const MapComponent = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-screen w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    );
};

export default MapComponent;
