import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LayerGroup, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { MarkerType, Place } from "../../types/markerTypes";
import CustomMarker from "./CustomMarker";
import { LatLng } from "leaflet";
import axios from "axios";

type Props = {
  markers: Place[];
  add: boolean;
  setCurrentMarker: (marker: Place) => void;
  currentMarker: Place;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
};
export const Markers: React.FC<Props> = ({
  add,
  setCurrentMarker,
  markers,
  setPlaces,
  currentMarker,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [tempPlace, setTempPlace] = useState<Place>(null);
  const map = useMap();
  useMapEvent("click", (e) => {
    console.log("click", add, popupOpen);

    if (add && !popupOpen) {
      // if tmpPlace is not null then remove it from the map
      if (tempPlace == null) {
        const tempPlace = {
          id: null,
          name: "",
          address: "",
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          verified: false,
          attributes: [],
          rating: 0,
        };

        setPlaces((prevMarkers) => [...prevMarkers, tempPlace]);
        setCurrentMarker(tempPlace);
        setTempPlace(tempPlace);
      }
    } else {
      setPlaces((prevMarkers) =>
        prevMarkers.filter((marker) => marker.id !== null)
      );
      setTempPlace(null);
      setCurrentMarker(null);
    }
  });

  const handlePopupOpen = (open: boolean) => {
    setPopupOpen(open);
  };

  const handleMarkerRemove = () => {
    setPlaces((prevMarkers) =>
      prevMarkers.filter((marker) => marker.id !== null)
    );
    setTempPlace(null);
    setCurrentMarker(null);
  };

  const handlePlaces = (place: Place) => {
    setPlaces([...markers, place]);
  };

  const handlePopupClose = () => {
    console.log("popup closed");
    setPopupOpen(false);
    if (currentMarker !== null) {
      if (!currentMarker?.verified) {
        setTempPlace(currentMarker);
        setPlaces((prevMarkers) =>
          prevMarkers.filter((marker) => marker.id !== null)
        );
        setPlaces((prevMarkers) => [...prevMarkers, currentMarker]);
        setCurrentMarker(null);
      }
    } else {
      setCurrentMarker(null);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (isPanning) {
      timeoutId = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else {
      setTimeRemaining(0);
    }

    return () => {
      clearInterval(timeoutId);
    };
  }, [isPanning]);

  useEffect(() => {
    if (timeRemaining === 0) {
      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      fetchData(ne, sw);
      setIsPanning(false);
    }
  }, [timeRemaining]);

  const fetchData = async (ne: LatLng, sw: LatLng) => {
    const response = await axios(
      `api/place/getallbyarea?nelat=${ne.lat}&nelng=${ne.lng}&swlat=${sw.lat}&swlng=${sw.lng}`
    );
    const data = await response.data;
    console.log("here", currentMarker);
    if (tempPlace !== null) {
      data.push(currentMarker);
    }
    setPlaces(data);
  };

  const handleMove = () => {
    setIsPanning(true);
    setTimeRemaining(2);
  };

  useEffect(() => {
    if (!popupOpen) {
      map.on("move", handleMove);
      return () => {
        map.off("move", handleMove);
      };
    }
  }, [map, handleMove]);

  useEffect(() => {
    if (currentMarker === null) {
      setPopupOpen(false);
    }
  }, [currentMarker]);

  return (
    <LayerGroup>
      {markers.map((place, index) => (
        <CustomMarker
          key={index}
          place={place}
          setCurrentMarker={setCurrentMarker}
          currentMarker={currentMarker}
          onRemove={() => handleMarkerRemove()}
          onOpen={handlePopupOpen}
          onClosed={handlePopupClose}
        ></CustomMarker>
      ))}
    </LayerGroup>
  );
};
