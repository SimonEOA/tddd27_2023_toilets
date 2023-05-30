import { Box, Button, Flex } from "@chakra-ui/react";

import { Place } from "../../types/markerTypes";
import handle from "../../pages/api/user/create";

type Props = {
  setAddMarker: React.Dispatch<React.SetStateAction<boolean>>;
  addMarker: boolean;
  markers: Place[];
  setMarkers: React.Dispatch<React.SetStateAction<Place[]>>;
};
export const ActionButton: React.FC<Props> = ({
  setAddMarker,
  addMarker,
  markers,
  setMarkers,
}) => {
  const handleAddMarkerClick = () => {
    if (addMarker) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].id == null) {
          setMarkers((prevMarkers) =>
            prevMarkers.filter((_, index) => index !== i)
          );
        }
      }
    }
    setAddMarker((prev) => !prev);
  };
  return (
    <Button
      position={"absolute"}
      p={2}
      right={0}
      bottom={150}
      bg={"white"}
      borderRadius={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={9999}
      cursor={"pointer"}
      onClick={() => {
        handleAddMarkerClick();
      }}
    >
      {addMarker ? "Adding" : "Add marker"}
    </Button>
  );
};
