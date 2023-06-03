import { Flex, Box, Button, Input, Text, Icon } from "@chakra-ui/react";
import { Place } from "../../types/markerTypes";
import AttributesShower from "../SideInfo/components/AttributesShower";
import { FaToiletPaper } from "react-icons/fa";

interface CustomMarkerProps {
  place: Place;
}

export default function CustomPopupBox({ place }: CustomMarkerProps) {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"} w={300}>
      <Flex justify={"center"} align={"center"} gap="3">
        <Text fontSize={"md"}>{place?.address}</Text>
        <Flex gap="1" align={"center"}>
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <Icon
                color={index <= place?.rating ? "lightblue" : "#BEBEBE"}
                boxSize="13px"
                key={index}
                as={FaToiletPaper}
              />
            );
          })}
          <Text fontSize={"sm"}>{"(" + place?.rating.toFixed(1) + ")"}</Text>
        </Flex>
      </Flex>

      {place?.attributes?.length !== 0 && (
        <AttributesShower attributes={place?.attributes} />
      )}
    </Flex>
  );
}
