import { StarIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaToiletPaper } from "react-icons/fa";
import { Place } from "../../../types/markerTypes";
import ShowImage from "../../ImageComponents/ShowImage";
import AttributesShower from "./AttributesShower";
import { Reviews } from "./Reviews";

const ShowPlace = ({
  place,
  setCurrentPlace,
  attributes,
  favourites,
  setFavourites,
}: {
  place: Place;
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place>>;
  attributes: string[];
  favourites: Place[];
  setFavourites: React.Dispatch<React.SetStateAction<Place[]>>;
}) => {
  const toast = useToast();

  const { data: session, status } = useSession();

  const handleAddToFavorites = async () => {
    const response = await axios.post(`api/user/addtofavourites`, {
      placeId: place.id,
      email: session?.user?.email,
    });
    const data = await response.data;

    if (response.status === 200) {
      toast({
        title: `Added to favorites!`,
        status: "success",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Error adding to favorites!`,
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    }
  };

  const handleRemoveFromFavorites = async () => {
    const response = await axios.post(`api/user/removefromfavourites`, {
      placeId: place.id,
      email: session?.user?.email,
    });
    const data = await response.data;

    if (response.status === 200) {
      toast({
        title: `Removed from favorites!`,
        status: "success",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Error removing from favorites!`,
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    }
  };

  const handleClickFavourite = () => {
    if (favourites.some((favourite) => favourite.id === place.id)) {
      handleRemoveFromFavorites();
      setFavourites(
        favourites.filter((favourite) => favourite.id !== place.id)
      );
    } else {
      handleAddToFavorites();
      setFavourites([...favourites, place]);
    }
  };

  return (
    <Flex w={"100%"} align={"center"} justify={"center"} direction={"column"}>
      <Flex w="90%" justify={"end"} align={"center"}>
        <StarIcon
          onClick={handleClickFavourite}
          color={
            favourites.some((favourite) => favourite.id === place.id)
              ? "#ffc40c"
              : "lightgray"
          }
          cursor={"pointer"}
        />
      </Flex>
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
              <Icon
                color={index <= place?.rating ? "lightblue" : "#BEBEBE"}
                boxSize="13px"
                key={index}
                as={FaToiletPaper}
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
