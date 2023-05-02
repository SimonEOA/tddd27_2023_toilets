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

const ToiletIcon = new Icon({
  iconUrl: "/002-bathroom.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

interface CustomMarkerProps {
  place: Place;
  currentMarker: (marker: string) => void;
  onRemove: () => void;
  onOpen: (open: boolean) => void;
  handlePlaces: (place: Place) => void;
}

export default function CustomMarker({
  place,
  currentMarker,
  onRemove,
  onOpen,
  handlePlaces,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const markerRef = useRef(null);
  const popupref = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  function handlePopupOpen() {
    currentMarker(place.address);
    onOpen(true);
  }

  function handlePopupClose() {
    onOpen(false);
  }

  const handleRemove = () => {
    onRemove();
  };
  const map = useMap();
  useEffect(() => {
    markerRef.current.openPopup();
  }, []);

  const addPlace = async () => {
    if (!session) console.log("Not logged in");
    else if (place.verified) console.log("Place already verified");
    else {
      const res = await fetch("/api/place/create", {
        method: "POST",
        body: JSON.stringify({
          name: session.user.name,
          address: address,
          attributes: ["test"],
          rating: 5,
          longitude: place.longitude,
          latitude: place.latitude,
          ownerId: session.user.id,
          verified: true,
        }),
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
      };
      handlePlaces(newPLace);
    }
  };

  const handleClick = (e) => {
    // map.flyTo(e.latlng, 18);
  };

  const point: Point = { lat: place.latitude, lng: place.longitude };
  return (
    <Marker
      position={point}
      icon={ToiletIcon}
      eventHandlers={{
        popupopen: () => handlePopupOpen(),
        popupclose: () => handlePopupClose(),
        click: (e) => {
          handleClick(e);
        },
      }}
      ref={markerRef}
    >
      <Popup ref={popupref}>
        {!place.verified ? (
          <Flex
            direction="row"
            align="center"
            justifyContent={"center"}
            w={300}
            h={100}
          >
            <Input
              placeholder="Name"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Input>
            <Button onClick={() => addPlace()}>Add Place</Button>
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
