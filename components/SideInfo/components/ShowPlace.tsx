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
} from "@chakra-ui/react";
import AttributesShower from "./AttributesShower";
import { Reviews } from "./Reviews";
import { Place } from "../../../types/markerTypes";
import { useState } from "react";

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
      <Image fallbackSrc="/001-public-toilet.png" maxW={"100%"} h="250px" />
      <HStack justify={"space-between"} w="90%">
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {place?.address}
        </Text>
        <HStack>
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
        </HStack>
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
              <Text>
                {
                  //place.description
                  "This public restroom in a city park features a modern design with white tile walls, silver sinks, private stalls, and plenty of natural light. It offers a clean and convenient oasis for park-goers to freshen up."
                }
              </Text>
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
