import { LayerGroup, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Icon, point } from "leaflet";
import { MarkerType, Place, Point } from "../../types/markerTypes";
import Image from "next/image";
import { Flex, Box, Button } from "@chakra-ui/react";
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
  const markerRef = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  function handlePopupOpen() {
    currentMarker(place.name);
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
    if (!place.verified) {
      const res = await fetch("/api/place/create", {
        method: "POST",
        body: JSON.stringify({
          name: session.user.name,
          address: "SIMONS väg 1",
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
          <Image src="/001-public-toilet.png" width={50} height={50} />
          <Image src="/002-bathroom.png" width={50} height={50} />
          <Image src="/003-bathroom-1.png" width={50} height={50} />
          <Image src="/004-shower.png" width={50} height={50} />
          <Button onClick={() => addPlace()}>Add Place</Button>
        </Flex>
      </Popup>
    </Marker>
  );
}
