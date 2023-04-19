import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { MarkerType } from "../../types/markerTypes";
import Image from "next/image";
import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";

const ToiletIcon = new Icon({
  iconUrl: "/001-public-toilet.png",
  iconSize: [50, 50],
});

interface CustomMarkerProps {
  key: number;
  marker: MarkerType;
  currentMarker: (marker: string) => void;
}

export default function CustomMarker({
  key,
  marker,
  currentMarker,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);

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

  return (
    <Marker
      position={marker.position}
      icon={ToiletIcon}
      eventHandlers={{
        click: (e) => {
          currentMarker(marker.info);
        },
      }}
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
        </Flex>
      </Popup>
    </Marker>
  );
}
