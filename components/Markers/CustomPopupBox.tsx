import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import { Place } from "../../types/markerTypes";
import AttributesShower from "../SlideInfoComponents/AttributesShower";

interface CustomMarkerProps {
  place: Place;
}

export default function CustomPopupBox({ place }: CustomMarkerProps) {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"} w={300}>
      {place?.attributes?.length !== 0 && (
        <AttributesShower attributes={place?.attributes} />
      )}
      <Text>{place?.address}</Text>
    </Flex>
  );
}
