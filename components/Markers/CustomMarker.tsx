import { LayerGroup, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Icon, point } from "leaflet";
import { MarkerType, Place, Point } from "../../types/markerTypes";
import Image from "next/image";
import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { on } from "events";
import { useRouter } from "next/router";
import { marker } from "leaflet";
import { ATTRIBUTE_IMAGES } from "../Attributes";
import AttributesShower from "../SlideInfoComponents/AttributesShower";
import CustomPopupBox from "./CustomPopupBox";

const ToiletIcon = new Icon({
  iconUrl: "/002-bathroom.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

interface CustomMarkerProps {
  place: Place;
  setCurrentMarker: (marker: Place) => void;
  currentMarker: Place;
  onRemove: () => void;
  onOpen: (open: boolean) => void;
  onClosed: () => void;
}

export default function CustomMarker({
  place,
  setCurrentMarker,
  currentMarker,
  onRemove,
  onOpen,
  onClosed,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const markerRef = useRef(null);
  const popupref = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  function handlePopupOpen() {
    setCurrentMarker(place);
    onOpen(true);
  }

  function handlePopupClose() {
    onOpen(false);
    onClosed();
  }

  const map = useMap();
  useEffect(() => {
    markerRef.current.openPopup();
  }, []);

  const point: Point = { lat: place.latitude, lng: place.longitude };
  return (
    <Marker
      position={point}
      icon={ToiletIcon}
      eventHandlers={{
        popupopen: () => handlePopupOpen(),
        popupclose: () => handlePopupClose(),
      }}
      ref={markerRef}
    >
      <Popup ref={popupref}>
        {!place.verified ? (
          <CustomPopupBox place={currentMarker} />
        ) : (
          <CustomPopupBox place={currentMarker} />
        )}
      </Popup>
    </Marker>
  );
}
