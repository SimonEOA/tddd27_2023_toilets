import dynamic from "next/dynamic";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import CustomMarker from "../components/Marker";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new Icon({
  iconUrl: "../assets/images/toiletimage.png",
  iconSize: [20, 20],
});

const Map = () => {
  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  const center = [geoData.lat, geoData.lng];

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.505, -0.09]} icon={customIcon} /> */}
      <Marker position={[51.505, -0.09]} />
    </MapContainer>
  );
};
export default Map;
