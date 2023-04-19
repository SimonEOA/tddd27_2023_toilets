import { useState } from "react";
import { LayerGroup, useMapEvents } from "react-leaflet";
import { MarkerType } from "../../types/markerTypes";
import CustomMarker from "./Marker";

export const Markers = ({
  add,
  currentMarker,
}: {
  add: boolean;
  currentMarker: (marker: string) => void;
}) => {
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
        <CustomMarker
          key={index}
          marker={marker}
          currentMarker={currentMarker}
        ></CustomMarker>
      ))}
    </LayerGroup>
  );
};
