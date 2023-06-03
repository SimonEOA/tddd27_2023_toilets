import { StarIcon } from "@chakra-ui/icons";
import {
  VStack,
  Button,
  Flex,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Box,
  Image,
  Text,
  Show,
} from "@chakra-ui/react";
import AttributesShower from "./AttributesShower";
import { Reviews } from "./Reviews";
import { Place } from "../../../types/markerTypes";
import { useState } from "react";
import ShowImage from "../../ImageComponents/ShowImage";

const ShowPlace = ({
  place,
  setCurrentPlace,
  setPlaces,
  attributes,
}: {
  place: Place;
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place>>;
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  attributes: string[];
}) => {
  return (
    <Flex w={"100%"} align={"center"} justify={"center"} direction={"column"}>
      <ShowImage images={place.images} />
      <HStack justify={"space-between"} w="90%">
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {place?.address}
        </Text>
        <Flex gap="1" align={"center"}>
          <Text fontSize={"sm"}>rating:</Text>
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <StarIcon
                color={index <= place?.rating ? "#ffc40c" : "#BEBEBE"}
                boxSize="13px"
                key={index}
              />
            );
          })}
          <Text fontSize={"sm"}>{"(" + place.rating.toFixed(1) + ")"}</Text>
        </Flex>
      </HStack>
      <Tabs isFitted w="100%">
        <TabList>
          <Tab>General Info</Tab>
          <Tab>Reviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction={"column"}>
              <Text fontWeight={"medium"}>Description:</Text>
              <Text fontSize={"15px"}>{place.description}</Text>
              <Divider my="10px" />

              <AttributesShower attributes={attributes} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Reviews place={place} setCurrentPlace={setCurrentPlace}></Reviews>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ShowPlace;
