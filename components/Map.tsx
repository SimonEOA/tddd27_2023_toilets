import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";

import { Markers } from "./Markers/Markes";
import { Place, Point } from "../types/markerTypes";
import { Button, Box, Text, Center } from "@chakra-ui/react";
import Header from "./Header";
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import * as GeoSearch from "leaflet-geosearch";
import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";

const customStyles = {
  input: {
    borderRadius: "md",
    borderColor: "gray.300",
    borderWidth: "1px",
    px: 2,
    py: 1,
  },
  suggestions: {
    borderRadius: "md",
    boxShadow: "lg",
    bg: "white",
    zIndex: "popover",
    mt: 2,
  },
  suggestionItem: {
    px: 2,
    py: 1,
    _hover: {
      bg: "gray.100",
    },
  },
};

const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  const searchControl = GeoSearchControl({
    provider: provider,

    ZoomControl: true,
    autoClose: true,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: false,
    searchLabel: "search",
    keepOpen: false,
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, []);

  return null;
};

const Map = ({ width, height }: { width: string; height: string }) => {
  const [geoData, setGeoData] = useState<Point>({ lat: 63, lng: 16 });
  const [addMarker, setAddMarker] = useState(false);
  const [marker, setMarker] = useState("");
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState<Place[]>([]);
  const provider = new GeoSearch.OpenStreetMapProvider();

  // you want to get it of the window global
  const search = GeoSearch.SearchControl({
    provider: provider,
  });

  const currentMarker = (marker: string) => {
    setMarker(marker);
  };
  const mapRef = useRef(null); // Create a ref for the map instance

  const handleFlyTo = (position: number[]) => {
    if (mapRef.current == null) return;
    mapRef.current.getCenter();
    const newPosition = [position[0], position[1]]; // The coordinates of Berlin
    const zoomLevel = 13; // The zoom level for the map

    mapRef.current.setView(newPosition, zoomLevel);
  };
  if (loading) return <p>Loading...</p>;

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
        <SearchField />
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
function useLeaflet(): { map: any } {
  throw new Error("Function not implemented.");
}
