import { Box, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useOpenClose from "../../hooks/useOpenClose";
import { Place } from "../../types/markerTypes";
import { CreatePlace } from "./components/CreatePlace";
import ShowPlace from "./components/ShowPlace";

const SideInfo = ({
  place,
  setCurrentPlace,
  setPlaces,
  favourites,
  setFavourites,
  setYourPlaces,
}: {
  place: Place;
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place>>;
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  favourites: Place[];
  setFavourites: React.Dispatch<React.SetStateAction<Place[]>>;
  setYourPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
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
        background="#f5feff"
      >
        <VStack overflow={"auto"} paddingY="20px" h="100%">
          {place?.verified ? (
            <ShowPlace
              place={place}
              setCurrentPlace={setCurrentPlace}
              attributes={attributes}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          ) : (
            <CreatePlace
              place={place}
              setCurrentPlace={setCurrentPlace}
              setPlaces={setPlaces}
              isOpen={isOpen}
              setYourPlaces={setYourPlaces}
            />
          )}
        </VStack>
      </Box>
    </HStack>
  );
};

export default SideInfo;
