import { Box, Flex, Text, chakra } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

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

export default function CustomMarker() {
  return (
    <Marker position={[58.4071175, 15.5644726]} icon={ToiletIcon}>
      <CustomPopup offset={[0, -25]}>
        {/* <Flex justify={"center"} align={"center"}>
          Hej
        </Flex> */}
        hej
      </CustomPopup>
    </Marker>
  );
}
