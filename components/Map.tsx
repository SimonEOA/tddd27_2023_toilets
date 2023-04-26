import { useEffect, useRef, useState } from "react";
import {
  LayerGroup,
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Markers } from "./Markers/Markes";
import { Place, Point } from "../types/markerTypes";
import { Button, Box, Text, Center } from "@chakra-ui/react";
import Header from "./Header";

const Map = ({
  width,
  height,
  markers,
}: {
  width: string;
  height: string;
  markers: Place[];
}) => {
  const [geoData, setGeoData] = useState<Point>({
    lat: markers[markers.length - 1].latitude,
    lng: markers[markers.length - 1].longitude,
  });
  const [addMarker, setAddMarker] = useState(false);
  const [marker, setMarker] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [position, setPosition] = useState<number[]>([]);
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState<Place[]>(markers);

  const currentMarker = (marker: string) => {
    setMarker(marker);
  };
  const mapRef = useRef(null); // Create a ref for the map instance

  const handleFlyTo = (position: number[]) => {
    if (mapRef.current == null) return;
    const newPosition = [position[0], position[1]]; // The coordinates of Berlin
    const zoomLevel = 13; // The zoom level for the map
    mapRef.current.flyTo(newPosition, zoomLevel);
  };

  const handleViewportChanged = async () => {
    const map = mapRef.current;
    const bounds = map.getBounds();
    setBounds(bounds);
    console.log(bounds);
    const res = await fetch("http://localhost:3000/api/place/getallbyarea", {
      method: "POST",
      body: JSON.stringify(bounds),
    });
    const data = await res.json();
    setPlaces(data);
  };

  return (
    <Box pos={"relative"}>
      <Header markers={markers} handleFly={handleFlyTo} />
      <MapContainer
        center={[geoData.lat, geoData.lng]}
        zoom={13}
        style={{ width: width, height: height }}
        placeholder={
          <p>
            Map.{" "}
            <noscript>You need to enable JavaScript to see this map.</noscript>
          </p>
        }
        zoomControl={false}
        ref={mapRef}
      >
        <MapViewportListener onViewportChanged={handleViewportChanged} />
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        <Markers
          add={addMarker}
          currentMarker={currentMarker}
          markers={markers}
        />

        <ZoomControl position="bottomright" />
      </MapContainer>
      <Button
        w={"100%"}
        mt="5px"
        onClick={() => {
          setAddMarker((cur) => !cur);
        }}
      >
        {!addMarker ? "Add markers" : "Stop adding markers"}
      </Button>

      <Center>
        <Text>{marker}</Text>
      </Center>
    </Box>
  );
};
export default Map;

function MapViewportListener({ onViewportChanged }) {
  useMapEvent("moveend", onViewportChanged);
  useMapEvent("zoomend", onViewportChanged);
  return null;
}
