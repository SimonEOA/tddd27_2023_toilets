import { useEffect, useState } from "react";
import { LayerGroup, useMapEvent, useMapEvents } from "react-leaflet";
import { MarkerType, Place } from "../../types/markerTypes";
import CustomMarker from "./Marker";

type Props = {
  markers: Place[];
  add: boolean;
  currentMarker: (marker: string) => void;
};
export const Markers: React.FC<Props> = ({ add, currentMarker, markers }) => {
  const [places, setPlaces] = useState<Place[]>(markers);

  const map = useMapEvent("click", (e) => {
    if (add) {
      setPlaces((prevMarkers) => [
        ...prevMarkers,
        {
          id: "test",
          name: "test",
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          verified: false,
        },
      ]);
    }
  });

  const handleMarkerRemove = (indexToRemove) => {
    setPlaces((prevMarkers) =>
      prevMarkers.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <LayerGroup>
      {places.map((place, index) => (
        <CustomMarker
          key={place.id}
          place={place}
          currentMarker={currentMarker}
          onRemove={() => handleMarkerRemove(index)}
        ></CustomMarker>
      ))}
    </LayerGroup>
  );
};
