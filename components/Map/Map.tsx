import { useRef, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { Place, Point } from "../../types/markerTypes";
import { Markers } from "../Markers/Markers";

import { MapType, StandardMap } from "../../types/mapTypes";
import { ActionButton } from "../ActionButton/ActionButton";
import MapSelector from "../MapSelector/MapSelector";
import SideInfo from "../SideInfo/SideInfo";
import SearchField from "./SearchField";
import QuickSelect from "./QuickSelect";

const Map = ({ width, height }: { width: string; height: string }) => {
  const [geoData, setGeoData] = useState<Point>({
    lat: 58.4072754,
    lng: 15.5645342,
  });
  const [addMarker, setAddMarker] = useState(false);
  const [marker, setMarker] = useState<Place>(null);
  const [markers, setMarkers] = useState<Place[]>([]);
  const [mapStyle, setMapStyle] = useState<MapType>(StandardMap);
  const [loading, setLoading] = useState(false);

  const [favourites, setFavourites] = useState<Place[]>([]);
  const [yourPlaces, setYourPlaces] = useState<Place[]>([]);

  const activeMarkerRef = useRef(null);

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
        favourites={favourites}
        setFavourites={setFavourites}
        setYourPlaces={setYourPlaces}
      ></SideInfo>
      <ActionButton
        addMarker={addMarker}
        setAddMarker={setAddMarker}
        setMarkers={setMarkers}
        markers={markers}
        setMarker={setMarker}
      />{" "}
      <MapSelector handleSetMapStyle={handleSetMapStyle} />
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
        {!marker && (
          <>
            <SearchField />
            <Flex
              position={"absolute"}
              top={0}
              right={0}
              zIndex={9999}
              w={"calc(50vw - 200px)"}
              minW={"60px"}
              margin={"10px auto 0"}
            >
              <QuickSelect
                setPlaces={setMarkers}
                setFavourites={setFavourites}
                favourites={favourites}
                setYourPlaces={setYourPlaces}
                yourPlaces={yourPlaces}
              />
              {loading && (
                <Flex align={"center"}>
                  <Spinner zIndex={9999} />
                </Flex>
              )}
            </Flex>
          </>
        )}
        <TileLayer attribution={mapStyle.attributes} url={mapStyle.url} />

        <Markers
          add={addMarker}
          setCurrentMarker={setMarker}
          currentMarker={marker}
          markers={markers}
          setPlaces={setMarkers}
          setLoading={setLoading}
        />

        <ZoomControl position="bottomright" />
      </MapContainer>
    </Box>
  );
};
export default Map;
