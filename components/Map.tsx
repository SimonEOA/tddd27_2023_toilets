import { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { Box, Text } from "@chakra-ui/react";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { Place, Point } from "../types/markerTypes";
import { Markers } from "./Markers/Markes";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { MapType, StandardMap } from "../types/mapTypes";
import { ActionButton } from "./ActionButton/ActionButton";
import MapSelector from "./MapSelector/MapSelector";
import SideInfo from "./SideInfo/SideInfo";

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
  const [mapStyle, setMapStyle] = useState<MapType>(StandardMap);

  const handleSetMapStyle = (map: MapType) => {
    setMapStyle(map);
    console.log(map);
  };
  return (
    <Box pos={"relative"}>
      <SideInfo
        place={marker}
        setCurrentPlace={setMarker}
        setPlaces={setMarkers}
      ></SideInfo>
      <ActionButton
        addMarker={addMarker}
        setAddMarker={setAddMarker}
        setMarkers={setMarkers}
        markers={markers}
        setMarker={setMarker}
      />{" "}
      <MapSelector handleSetMapStyle={handleSetMapStyle} />
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
        <TileLayer attribution={mapStyle.attributes} url={mapStyle.url} />

        <Markers
          add={addMarker}
          setCurrentMarker={setMarker}
          currentMarker={marker}
          markers={markers}
          setPlaces={setMarkers}
        />

        <ZoomControl position="bottomright" />
      </MapContainer>
    </Box>
  );
};
export default Map;
