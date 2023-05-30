import { LayerGroup, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Icon, point } from "leaflet";
import { MarkerType, Place, Point } from "../../types/markerTypes";
import Image from "next/image";
import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { on } from "events";
import { useRouter } from "next/router";

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
  handlePlaces: (place: Place) => void;
}

export default function CustomMarker({
  place,
  setCurrentMarker,
  currentMarker,
  onRemove,
  onOpen,
  handlePlaces,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const markerRef = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  function handlePopupOpen() {
    setCurrentMarker(place);
    onOpen(true);
  }

  function handlePopupClose() {
    if (!place.verified) {
      handleRemove();
    }
    onOpen(false);
  }

  const handleRemove = () => {
    onRemove();
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  const addPlace = async () => {
    if (!session) console.log("Not logged in");
    else if (place.verified) console.log("Place already verified");
    else {
      const res = await fetch("/api/place/create", {
        method: "POST",
        body: JSON.stringify(place),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      const newPLace: Place = {
        id: data.id,
        name: data.name,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
        verified: true,
        rating: data.rating,
      };
      handlePlaces(newPLace);
    }
  };

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
      <Popup>
        {!place.verified ? (
          <Flex
            direction="row"
            align="center"
            justifyContent={"center"}
            w={300}
            h={100}
          >
            <Box>
              {currentMarker?.address ?? "Placeholder address"}
              <br />
              {currentMarker?.name ?? "Placeholder name"}
            </Box>
          </Flex>
        ) : (
          <Flex
            direction="column"
            align="center"
            justifyContent={"center"}
            w={300}
            h={100}
          >
            <Image
              src="/001-public-toilet.png"
              alt="Picture of the author"
              width={50}
              height={50}
            />
            <Text>{place.address + " by " + place.name}</Text>
          </Flex>
        )}
      </Popup>
    </Marker>
  );
}
