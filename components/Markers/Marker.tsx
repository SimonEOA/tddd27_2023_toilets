import { Box, Flex, Text, background, chakra } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { MarkerType } from "../../types/markerTypes";

const ToiletIcon = new Icon({
  iconUrl: "/001-public-toilet.png",
  iconSize: [50, 50],
});

const CustomPopup = chakra(Popup, {
  baseStyle: {
    backgroundColor: "blue",
    padding: "0",
    borderRadius: "0.25rem",
  },
});

interface CustomMarkerProps {
  key: number;
  marker: MarkerType;
}

export default function CustomMarker({ key, marker }: CustomMarkerProps) {
  return (
    <Marker position={marker.position} icon={ToiletIcon}>
      <CustomPopup offset={[0, -25]}>{marker.info}</CustomPopup>
    </Marker>
  );
}
