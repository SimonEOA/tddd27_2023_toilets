import {
  Button,
  Box,
  Flex,
  Center,
  Input,
  Text,
  Grid,
  Heading,
  Select,
  VStack,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Place } from "../types/markerTypes";
import { useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { parse } from "path";
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
    >
      <Select
        justifySelf={"flex-start"}
        ml={10}
        width={"200px"}
        size="lg"
        onChange={(e) => {
          const [lat, lng] = e.target.value.split(",");
          const tempPLace: Place = {
            id: "test",
            name: "test",
            address: "test",
            latitude: Number(parseFloat(lat).toFixed(3)),
            longitude: Number(parseFloat(lng).toFixed(3)),
            verified: false,
          };
          handleFly([tempPLace.latitude, tempPLace.longitude]);
        }}
      >
        {markers.map((marker) => (
          <option
            key={marker.id}
            value={`${marker.latitude},${marker.longitude}`}
          >
            <VStack>
              <Text>{marker.address} </Text>
              <Text>{`${Number(marker.latitude.toFixed(3))},${Number(
                marker.longitude.toFixed(3)
              )}`}</Text>
            </VStack>
          </option>
        ))}
      </Select>
      <Heading justifySelf={"center"}>TOILETS</Heading>

      {!session ? (
        <Button justifySelf={"flex-end"} mr={10} onClick={() => signIn()}>
          Login
        </Button>
      ) : (
        <Button justifySelf={"flex-end"} mr={10} onClick={() => signOut()}>
          Logout
        </Button>
      )}
    </Grid>
  );
}
