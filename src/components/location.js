import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './location.css'; 

function Location() {
    const position = [37.7749, -122.4194]; // Coordinates for Seattle
    const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

    return (
        <div style={{ width: '90%' }}>
        <h4>Currently: San Francisco</h4>
            <MapContainer center={position} zoom={12} style={{ width: '100%', height: '300px' }} className="rounded-map">
                <TileLayer
                url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
                id="mapbox/streets-v11" />
            </MapContainer>
        </div>
    );
}

export default Location;
