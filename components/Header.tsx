import { Button, Text, Grid, Heading, Select, HStack } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Place } from "../types/markerTypes";

interface HeaderProps {
  markers: Place[];
  handleFly: (pos: number[]) => void;
}

export default function Header({ markers, handleFly }: HeaderProps) {
  const { data: session, status } = useSession();

  return (
    <Grid
      shadow={"md"}
      templateColumns="1fr auto 1fr"
      alignItems="center"
      p={2}
      h="60px"
    >
      <Select
        justifySelf={"flex-start"}
        ml={10}
        width={"200px"}
        size="md"
        onChange={(e) => {
          const [lat, lng] = e.target.value.split(",");
          const tempPLace: Place = {
            id: "test",
            name: "test",
            address: "test",
            latitude: Number(parseFloat(lat).toFixed(3)),
            longitude: Number(parseFloat(lng).toFixed(3)),
            verified: false,
            rating: 0,
          };
          handleFly([tempPLace.latitude, tempPLace.longitude]);
        }}
        w="fit-content"
      >
        {markers.map((marker) => (
          <option
            key={marker.id}
            value={`${marker.latitude},${marker.longitude}`}
          >
            {marker.address +
              " " +
              Number(marker.latitude.toFixed(3)) +
              " " +
              Number(marker.longitude.toFixed(3))}
          </option>
        ))}
      </Select>
      <Heading justifySelf={"center"}>TOILETS</Heading>

      {!session ? (
        <Button justifySelf={"flex-end"} mr={10} onClick={() => signIn()}>
          Login
        </Button>
      ) : (
        <HStack justifySelf={"flex-end"} mr={10}>
          <Text>{session.user.name}</Text>
          <Button onClick={() => signOut()}>Logout</Button>
        </HStack>
      )}
    </Grid>
  );
}
