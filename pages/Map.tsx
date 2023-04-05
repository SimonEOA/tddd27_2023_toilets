import dynamic from "next/dynamic";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import CustomMarker from "../components/Marker";
import "leaflet/dist/leaflet.css";

import "leaflet/dist/leaflet.css";

const Map = ({ width, height }: { width: string; height: string }) => {
  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  const center = [geoData.lat, geoData.lng];

  return (
    <MapContainer
      center={[58.4071175, 15.5644726]}
      zoom={13}
      style={{ width: width, height: height }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <CustomMarker />
    </MapContainer>
  );
};
export default Map;
