import { LayerGroup, Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon, point } from "leaflet";
import { MarkerType, Place, Point } from "../../types/markerTypes";
import Image from "next/image";
import { Flex, Box, Button, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { on } from "events";
import { useRouter } from "next/router";

const ToiletIcon = new Icon({
  iconUrl: "/001-public-toilet.png",
  iconSize: [50, 50],
});

interface CustomMarkerProps {
  place: Place;
  currentMarker: (marker: string) => void;
  onRemove: () => void;
  onOpen: (open: boolean) => void;
}

export default function CustomMarker({
  place,
  currentMarker,
  onRemove,
  onOpen,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const markerRef = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  function handlePopupOpen() {
    currentMarker(place.address);
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
    if (!place.verified && session) {
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
      console.log(data);
      router.reload();
    } else {
      console.log("Place already verified");
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
      <Popup offset={[0, -25]}>
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
      </Popup>
    </Marker>
  );
}
