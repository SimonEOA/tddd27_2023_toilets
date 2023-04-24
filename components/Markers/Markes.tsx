import { useState } from "react";
import { LayerGroup, useMapEvents } from "react-leaflet";
import { MarkerType } from "../../types/markerTypes";
import CustomMarker from "./Marker";
import axios from "axios";

type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  markers: Place[];
  add: boolean;
  currentMarker: (marker: string) => void;
};
export const Markers: React.FC<Props> = ({ add, currentMarker, markers }) => {
  const [places, setPlaces] = useState<Place[]>(markers);
  const map = useMapEvents({
    click(e) {
      if (!add) return;

      const newPlace: Place = {
        id: "test",
        name: "New Place",
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };
      setPlaces([...places, newPlace]);
    },
  });

  const handleMarkerRemove = (indexToRemove) => {
    setPlaces((prevMarkers) =>
      prevMarkers.filter((_, index) => index !== indexToRemove)
    );
  };
  console.log(markers);

  return (
    <LayerGroup>
      {places.map((place, index) => (
        <CustomMarker
          key={index}
          place={place}
          currentMarker={currentMarker}
          onRemove={() => handleMarkerRemove(index)}
        ></CustomMarker>
      ))}
    </LayerGroup>
  );
};
