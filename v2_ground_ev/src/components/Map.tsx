"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const chargingIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3103/3103309.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const carIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2962/2962303.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Animation component to move the car
const MovingCar = ({ path }: { path: [number, number][] }) => {
  const [pos, setPos] = useState(path[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < path.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
        setPos(path[index + 1]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index, path]);

  return <Marker position={pos} icon={carIcon} />;
};

const Map = () => {
  // Sample path through a city
  const roadPath: [number, number][] = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.515, -0.09],
    [51.52, -0.08],
    [51.525, -0.09],
  ];

  const chargingStations: [number, number][] = [
    [51.51, -0.095],
    [51.52, -0.085],
  ];

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={[51.505, -0.09]} icon={icon}>
          <Popup>Start Hub</Popup>
        </Marker>
        
        <Marker position={[51.525, -0.09]} icon={icon}>
          <Popup>Destination Hub</Popup>
        </Marker>

        {chargingStations.map((pos, idx) => (
          <Marker key={idx} position={pos} icon={chargingIcon}>
            <Popup>Fast Charging Station #{idx+1}</Popup>
          </Marker>
        ))}

        <Polyline positions={roadPath} color="#10b981" weight={5} opacity={0.7} />
        
        <MovingCar path={roadPath} />
      </MapContainer>
    </div>
  );
};

export default Map;
