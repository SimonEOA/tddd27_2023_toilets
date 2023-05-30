import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { Markers } from "./Markers/Markes";
import { Place, Point } from "../types/markerTypes";
import { Button, Box, Text, Center } from "@chakra-ui/react";
import Header from "./Header";
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import * as GeoSearch from "leaflet-geosearch";
import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import SideInfo from "./SlideInfo/SideInfo";
import { ActionButton } from "./ActionButton/ActionButton";

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
    style: "bar",
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
  const [marker, setMarker] = useState<Place>(null);

  const [markers, setMarkers] = useState<Place[]>([]);

  return (
    <Box pos={"relative"}>
      <SideInfo place={marker} setCurrentPlace={setMarker}></SideInfo>
      <ActionButton
        addMarker={addMarker}
        setAddMarker={setAddMarker}
        setMarkers={setMarkers}
        markers={markers}
      />
      <Text pos={"absolute"} top={0} right={0} bg={"Red"} zIndex={9999}>
        {addMarker ? "Edit mode +" : ""}
        {marker ? "Editing marker " : ""}
      </Text>
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
        {!marker && <SearchField />}
        <TileLayer
          //attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          //url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Markers
          add={addMarker}
          setCurrentMarker={setMarker}
          currentMarker={marker}
          markers={markers}
          setPlaces={setMarkers}
        />

        <ZoomControl position="bottomright" />
      </MapContainer>
      {/* <Button
        w={"100%"}
        mt="5px"
        onClick={() => {
          setAddMarker((cur) => !cur);
        }}
      >
        {!addMarker ? "Add markers" : "Stop adding markers"}
      </Button> */}
    </Box>
  );
};
export default Map;
