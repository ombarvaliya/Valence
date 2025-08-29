'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet'; // Import Icon
import { useState, useEffect } from 'react';
import { IAsset } from '@/models/Asset';

// --- CRUCIAL FIX: Manually import and set up default icon images ---
// This resolves the "iconUrl not set" and "_leaflet_events" errors.
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: iconMarker.src,
  iconRetinaUrl: iconRetina.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// --------------------------------------------------------------------

interface ApiResponse {
    success: boolean;
    data: IAsset[];
    message?: string;
}

const getAssetIcon = (assetType: IAsset['assetType']) => {
  const colors = {
    Renewable: '#22c55e',
    Hydrogen: '#3b82f6',
    Demand: '#f97316',
  };
  const color = colors[assetType] || '#6b7280';

  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32px" height="32px" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.4));">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`;

  return divIcon({
    html: iconSvg,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const MapMessage = ({ text }: { text: string }) => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-[1000] border">
        <p className="text-gray-800 font-semibold text-lg">{text}</p>
    </div>
);

export default function Map() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'no-data'>('loading');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setStatus('loading');
        const response = await fetch('/api/assets');
        const result: ApiResponse = await response.json();
        if (result.success) {
          if (result.data.length > 0) {
            setAssets(result.data);
            setStatus('success');
          } else {
            setStatus('no-data');
          }
        } else {
          console.error("API Error:", result.message);
          setStatus('error');
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        setStatus('error');
      }
    };
    fetchAssets();
  }, []);

  const position: [number, number] = [23.59, 78.96];

  return (
    <div className="relative h-full w-full">
      <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {status === 'success' && assets.map((asset) => (
          <Marker
            key={String(asset._id)}
            position={[asset.location.coordinates[1], asset.location.coordinates[0]]}
            icon={getAssetIcon(asset.assetType)} // Using our custom color icon
          >
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-md">{asset.name}</h3>
                <p><strong>Type:</strong> {asset.assetType}</p>
                {asset.capacity && <p><strong>Capacity:</strong> {asset.capacity}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {status === 'loading' && <MapMessage text="Loading assets..." />}
      {status === 'no-data' && <MapMessage text="No assets found. Try adding one!" />}
      {status === 'error' && <MapMessage text="Error loading assets." />}
    </div>
  );
}