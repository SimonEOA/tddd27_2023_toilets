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
import ShowPlace from "./components/ShowPlace";

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
            <ShowPlace
              place={place}
              setCurrentPlace={setCurrentPlace}
              setPlaces={setPlaces}
              attributes={attributes}
            />
          ) : (
            <CreatePlace
              place={place}
              setCurrentPlace={setCurrentPlace}
              setPlaces={setPlaces}
              isOpen={isOpen}
            />
          )}
        </VStack>
      </Box>
    </HStack>
  );
};

export default SideInfo;
