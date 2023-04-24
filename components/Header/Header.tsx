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
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Place } from "../../types/markerTypes";
import { useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { parse } from "path";
interface HeaderProps {
  markers: Place[];
  setPlace: (place: Place) => void;
}

export default function Header({ markers, setPlace }: HeaderProps) {
  const { data: session, status } = useSession();
  function handleSelect(value, event) {
    console.log(`Selected value: ${value}`);
  }
  return (
    <Grid
      shadow={"md"}
      templateColumns="1fr auto 1fr"
      alignItems="center"
      p={2}
    >
      <Select
        placeholder="Search"
        justifySelf={"flex-start"}
        ml={10}
        width={"200px"}
        onChange={(e) => {
          const [lat, lng] = e.target.value.split(",");
          const tempPLace: Place = {
            id: "test",
            name: "test",
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            verified: false,
          };
          setPlace(tempPLace);
        }}
      >
        {markers.map((marker) => (
          <option
            key={marker.id}
            value={`${marker.latitude},${marker.longitude}`}
          >
            {(marker.latitude, marker.longitude)}
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
