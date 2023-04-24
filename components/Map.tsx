import { useEffect, useRef, useState } from "react";
import {
  LayerGroup,
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Markers } from "./Markers/Markes";
import { Place, Point } from "../types/markerTypes";
import { Button, Box, Text, Center } from "@chakra-ui/react";

type Props = {
  markers: Place[];
};

const Map = ({
  width,
  height,
  markers,
  place,
}: {
  width: string;
  height: string;
  markers: Place[];
  place: Place;
}) => {
  const [geoData, setGeoData] = useState<Point>({
    lat: 64.536634,
    lng: 16.779852,
  });
  const [addMarker, setAddMarker] = useState(false);
  const [marker, setMarker] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const currentMarker = (marker: string) => {
    setMarker(marker);
  };
  const mapRef = useRef(null); // Create a ref for the map instance

  const handleFlyTo = (place: Place) => {
    console.log(place);
    if (mapRef.current == null) return;
    const newPosition = [58.409, 15.0]; // The coordinates of Berlin
    const zoomLevel = 13; // The zoom level for the map
    mapRef.current.flyTo(newPosition, zoomLevel); // Fly to the new position using the flyTo() method
  };

  useEffect(() => {
    console.log("FLY");
    handleFlyTo(place);
  }, [place]);

  return (
    <Box pos={"relative"}>
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
