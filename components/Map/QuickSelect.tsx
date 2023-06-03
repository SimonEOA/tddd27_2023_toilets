import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Place } from "../../types/markerTypes";
import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";

const QuickSelect = ({
  setPlaces,
  setFavourites,
  favourites,
  setYourPlaces,
  yourPlaces,
}: {
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  setFavourites: Dispatch<SetStateAction<Place[]>>;
  favourites: Place[];
  setYourPlaces: Dispatch<SetStateAction<Place[]>>;
  yourPlaces: Place[];
}) => {
  const map = useMap();
  const toast = useToast();

  const fetchData = async (ne: LatLng, sw: LatLng) => {
    const response = await axios(
      `api/place/getallbyarea?nelat=${ne.lat}&nelng=${ne.lng}&swlat=${sw.lat}&swlng=${sw.lng}`
    );
  };

  const fetchYourPlaces = async () => {
    const response = await axios(`api/place/getallbyemail`);
    const data = await response.data;

    if (response.status === 200) {
      setYourPlaces(data);
    }
  };

  const fetchFavourites = async () => {
    const response = await axios(`api/user/getallfavourites`);
    const data = await response.data;

    if (response.status === 200) {
      setFavourites(data);
    }
  };

  const handleSelectPlace = (place: Place) => {
    map.panTo([place.latitude, place.longitude]);
    fetchData(map.getBounds().getNorthEast(), map.getBounds().getSouthWest());
  };

  useEffect(() => {
    fetchYourPlaces();
    fetchFavourites();
  }, []);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} size={"sm"}>
        Quick Select
      </MenuButton>
      <MenuList>
        <MenuGroup title="Favourites">
          {favourites.map((place) => (
            <MenuItem key={place.id} onClick={() => handleSelectPlace(place)}>
              {place.address}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Your Places">
          {yourPlaces.map((place) => (
            <MenuItem key={place.id} onClick={() => handleSelectPlace(place)}>
              {place.address}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default QuickSelect;
