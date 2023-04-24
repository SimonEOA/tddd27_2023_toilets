import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Markers } from "./Markers/Markes";
import { Point } from "../types/markerTypes";
import { Button, Box, Text, Center } from "@chakra-ui/react";
type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};
type Props = {
  markers: Place[];
};

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
    lat: 64.536634,
    lng: 16.779852,
  });
  const [addMarker, setAddMarker] = useState(false);
  const [marker, setMarker] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const currentMarker = (marker: string) => {
    setMarker(marker);
  };

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
      <Button w={"100%"} mt="5px" onClick={() => setAddMarker((cur) => !cur)}>
        {!addMarker ? "Add markers" : "Stop adding markers"}
      </Button>
      <Center>
        <Text>{marker}</Text>
      </Center>
    </Box>
  );
};
export default Map;
