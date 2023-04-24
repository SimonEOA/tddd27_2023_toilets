import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon, point } from "leaflet";
import { MarkerType, Point } from "../../types/markerTypes";
import Image from "next/image";
import { Flex, Box, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useAddMarker } from "../../hooks/Markers";

const ToiletIcon = new Icon({
  iconUrl: "/001-public-toilet.png",
  iconSize: [50, 50],
});

type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

interface CustomMarkerProps {
  place: Place;
  currentMarker: (marker: string) => void;
  onRemove: () => void;
}

export default function CustomMarker({
  place,
  currentMarker,
  onRemove,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const { data: session, status } = useSession();

  function handlePopupOpen() {
    setPopupOpen(true);
  }

  function handlePopupClose() {
    setPopupOpen(false);
  }
  const map = useMapEvents({
    click(e) {
      console.log("map");
    },
  });

  const handleRemove = () => {
    onRemove();
  };
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [markerRef]);

  const addPlace = async () => {
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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };
  const point: Point = { lat: place.latitude, lng: place.longitude };
  return (
    <Marker
      position={point}
      icon={ToiletIcon}
      eventHandlers={{
        click: (e) => {
          currentMarker(place.name);
        },
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
