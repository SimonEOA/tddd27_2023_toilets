import { Box } from "@chakra-ui/react";
import { Icon } from "leaflet";
import { useState } from "react";
import { LayerGroup, Marker, Popup, useMapEvents } from "react-leaflet";
import { MarkerType } from "../types/markerTypes";

export const Markers = ({ add }: { add: boolean }) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const map = useMapEvents({
    click(e) {
      if (!add) return;
      setMarkers((current) => [
        ...current,
        { position: e.latlng, info: "test" },
      ]);
    },
  });

  return (
    <LayerGroup>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <span>{marker.info}</span>
          </Popup>
        </Marker>
      ))}
    </LayerGroup>
  );
};
