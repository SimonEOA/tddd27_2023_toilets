import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import CustomMarker from "../components/Marker";
import "leaflet/dist/leaflet.css";

import { Markers } from "../components/Markers/Markes";
import { Point } from "../types/markerTypes";
import { Button } from "@chakra-ui/react";

const Map = ({ width, height }: { width: string; height: string }) => {
  const [geoData, setGeoData] = useState<Point>({
    lat: 64.536634,
    lng: 16.779852,
  });
  const [addMarker, setAddMarker] = useState(false);

  return (
    <>
      <MapContainer
        center={[geoData.lat, geoData.lng]}
        zoom={13}
        style={{ width: width, height: height }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <Markers add={addMarker} />
      </MapContainer>
      <Button w={"100%"} mt="5px" onClick={() => setAddMarker((cur) => !cur)}>
        {!addMarker ? "Add markers" : "Stop adding markers"}
      </Button>
    </>
  );
};
export default Map;
