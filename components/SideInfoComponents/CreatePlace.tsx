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
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Place } from "../../types/markerTypes";
import { useSession } from "next-auth/react";

export const CreatePlace = ({
  place,
  setCurrentPlace,
}: {
  place: Place;
  setCurrentPlace: Dispatch<SetStateAction<Place>>;
}) => {
  const [name, setName] = useState<string>(place?.name);
  const [address, setAddress] = useState<string>(place?.address);
  const [description, setDescription] = useState<string>(place?.description);

  const { data: session, status } = useSession();

  const addPlace = async () => {
    if (!session) console.log("Not logged in");
    else if (place.verified) console.log("Place already verified");
    else {
      console.log(place);
      const res = await fetch("/api/place/create", {
        method: "POST",
        body: JSON.stringify({
          name: session.user.name,
          address: place.address,
          attributes: ["test"],
          rating: 5,
          longitude: place.longitude,
          latitude: place.latitude,
          ownerId: session.user.id,
          verified: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      const data = await res.json();
      const newPLace: Place = {
        id: data.id,
        name: data.name,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
        verified: true,
        rating: data.rating,
      };
      //handlePlaces(newPLace);
    }
  };

  return (
    <Flex w={"100%"} align={"center"} justify={"center"} direction={"column"}>
      <Image fallbackSrc="/001-public-toilet.png" maxW={"100%"} h="250px" />
      <Button>Add Image</Button>
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Name:</Text>
        <Input
          placeholder="Write name..."
          size="sm"
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
        <Flex>
          <IconButton icon={<PhoneIcon />} aria-label="Add tag" />
          <IconButton icon={<MoonIcon />} aria-label="Add tag" />
          <IconButton icon={<DeleteIcon />} aria-label="Add tag" />
          <IconButton icon={<SunIcon />} aria-label="Add tag" />
        </Flex>
      </Stack>
      <Button mt="10px" onClick={addPlace}>
        Save
      </Button>
    </Flex>
  );
};
