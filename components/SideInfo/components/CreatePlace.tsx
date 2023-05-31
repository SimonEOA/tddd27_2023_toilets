import { DeleteIcon, MoonIcon, PhoneIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Text,
  Input,
  Textarea,
  Stack,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Place } from "../../../types/markerTypes";
import { useSession } from "next-auth/react";
import Attributes from "./AttributesSelector";

export const CreatePlace = ({
  place,
  setCurrentPlace,
  setPlaces,
}: {
  place: Place;
  setCurrentPlace: Dispatch<SetStateAction<Place>>;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
}) => {
  const [name, setName] = useState<string>(place?.name);
  const [address, setAddress] = useState<string>(place?.address);
  const [description, setDescription] = useState<string>(place?.description);
  const [attributes, setAttributes] = useState<string[]>();

  const { data: session, status } = useSession();
  const toast = useToast();

  const addPlace = async () => {
    if (!session) {
      toast({
        title: `Not Logged In!`,
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    } else if (place.verified) {
      toast({
        title: `Place Not Verified!`,
        status: "error",
        variant: "subtle",

        isClosable: true,
      });
    } else {
      console.log(place);
      const res = await fetch("/api/place/create", {
        method: "POST",
        body: JSON.stringify({
          name: session.user.name,
          address: place.address,
          attributes: attributes,
          rating: 0,
          longitude: place.longitude,
          latitude: place.latitude,
          ownerId: session.user.id,
          description: place.description,
          verified: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setPlaces((prev) => [...prev, data]);
        setCurrentPlace(data);
        setPlaces((prev) => prev.filter((place) => place.id !== null));
        toast({
          title: `Place added!`,
          status: "success",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Error Adding Place!`,
          status: "error",
          variant: "subtle",

          isClosable: true,
        });
      }
    }
  };

  const updateAttributes = (attributes: string[]) => {
    setAttributes(attributes);
    setCurrentPlace((prev) => ({
      ...prev,
      attributes: attributes,
    }));
  };

  useEffect(() => {
    console.log("new place", place);
  }, [place]);

  return (
    <Flex w={"100%"} align={"center"} justify={"center"} direction={"column"}>
      <Image fallbackSrc="/001-public-toilet.png" maxW={"100%"} h="250px" />
      <Button>Add Image</Button>
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Name:</Text>
        <Input
          placeholder="Write name..."
          size="sm"
          value={place ? place?.address : ""}
          onChange={(e) => {
            setCurrentPlace((prev) => ({
              ...prev,
              address: e.target.value,
            }));
          }}
        ></Input>
      </Stack>
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Description</Text>
        <Textarea
          placeholder="Write description..."
          size="sm"
          value={place ? place.description : ""}
          onChange={(e) => {
            setCurrentPlace((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        ></Textarea>
      </Stack>
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Attributes</Text>
        <Attributes place={place} updateAttributes={updateAttributes} />
      </Stack>
      <Button mt="10px" onClick={addPlace}>
        Save
      </Button>
    </Flex>
  );
};
