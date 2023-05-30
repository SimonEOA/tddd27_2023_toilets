import { Box, Flex, Select } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch } from "react";
import { MapType, MapList } from "../../types/mapTypes";

interface MapSelectorProps {
  handleSetMapStyle: (map: MapType) => void;
}

export default function MapSelector({ handleSetMapStyle }: MapSelectorProps) {
  return (
    <Box position={"absolute"} w={150} top={0} right={0} zIndex={9999}>
      <Select
        backgroundColor={"#fff"}
        onChange={(e) => {
          handleSetMapStyle(MapList.find((map) => map.name === e.target.value));
        }}
      >
        {MapList.map((map) => (
          <option key={map.name} value={map.name}>
            {map.name}
          </option>
        ))}
      </Select>
    </Box>
  );
}
