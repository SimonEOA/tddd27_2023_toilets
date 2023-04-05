import { Box } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("../assets/images/toiletimage.png"),
    iconSize: _iconSize,
  });
}

export default function CustomMarker() {
  return <Marker position={[51.505, -0.09]} icon={GetIcon(20)}></Marker>;
}
