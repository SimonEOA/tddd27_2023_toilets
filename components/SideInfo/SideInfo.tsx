import {
  Box,
  Button,
  HStack,
  Slide,
  VStack,
  useDisclosure,
  Image,
  Flex,
  Text,
  Divider,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useOpenClose from "../../hooks/useOpenClose";
import {
  DeleteIcon,
  MoonIcon,
  PhoneIcon,
  StarIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Reviews } from "./components/Reviews";
import { CreatePlace } from "./components/CreatePlace";
import { Place } from "../../types/markerTypes";
import AttributesShower from "./components/AttributesShower";

const SideInfo = ({
  place,
  setCurrentPlace,
  setPlaces,
}: {
  place: Place;
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place>>;
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
}) => {
  const { isOpen, toggle, close, open } = useOpenClose();
  const [attributes, setAttributes] = useState<string[]>([]);

  useEffect(() => {
    if (!place) {
      close();
    } else {
      open();
      setAttributes(place.attributes);
    }
  }, [place]);

  useEffect(() => {
    console.log("open", isOpen);
  }, [isOpen]);
  return (
    <HStack justify={"center"}>
      <Box
        position={"fixed"}
        top="60px"
        left={"0"}
        height={"calc(100vh - 60px)"}
        width={"400px"}
        bg={"white"}
        zIndex={9999}
        rounded={"xl"}
        transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
        transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
        opacity={isOpen ? 1 : 0}
      >
        <VStack overflow={"auto"} paddingY="20px" h="100%">
          {place?.verified ? (
            <Flex
              w={"100%"}
              align={"center"}
              justify={"center"}
              direction={"column"}
            >
              <Image
                fallbackSrc="/001-public-toilet.png"
                maxW={"100%"}
                h="250px"
              />
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
                      <Text>{place.description}</Text>
                      <Divider my="10px" />

                      <AttributesShower attributes={attributes} />
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Reviews place={place}></Reviews>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          ) : (
            <CreatePlace
              place={place}
              setCurrentPlace={setCurrentPlace}
              setPlaces={setPlaces}
            ></CreatePlace>
          )}
        </VStack>
      </Box>
    </HStack>
  );
};

export default SideInfo;
