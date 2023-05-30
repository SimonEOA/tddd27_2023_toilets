import { useEffect, useState } from "react";
import { LayerGroup, useMapEvent, useMapEvents } from "react-leaflet";
import { MarkerType, Place } from "../../types/markerTypes";
import CustomMarker from "./CustomMarker";

type Props = {
  markers: Place[];
  add: boolean;
  setCurrentMarker: (marker: Place) => void;
  currentMarker: Place;
};
export const Markers: React.FC<Props> = ({
  add,
  setCurrentMarker,
  markers,
  currentMarker,
}) => {
  const [places, setPlaces] = useState<Place[]>(markers);
  const [popupOpen, setPopupOpen] = useState(false);

  const map = useMapEvent("click", (e) => {
    if (add && !popupOpen) {
      setPlaces((prevMarkers) => [
        ...prevMarkers,
        {
          id: null,
          name: null,
          address: null,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          verified: false,
          attributes: [],
          rating: 0,
        },
      ]);
    }
  });

  const map2 = useMapEvent("popupclose", (e) => {
    setCurrentMarker(null);
  });

  const handlePopupOpen = (open: boolean) => {
    setPopupOpen(open);
  };

  const handleMarkerRemove = (indexToRemove) => {
    setPlaces((prevMarkers) =>
      prevMarkers.filter((_, index) => index !== indexToRemove)
    );
  };

  const handlePlaces = (place: Place) => {
    setPlaces([...places, place]);
  };

  return (
    <LayerGroup>
      {places.map((place, index) => (
        <CustomMarker
          key={place.id}
          place={place}
          setCurrentMarker={setCurrentMarker}
          currentMarker={currentMarker}
          onRemove={() => handleMarkerRemove(index)}
          onOpen={handlePopupOpen}
          handlePlaces={handlePlaces}
        ></CustomMarker>
      ))}
    </LayerGroup>
  );
};
