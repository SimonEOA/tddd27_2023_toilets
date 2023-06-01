import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LayerGroup, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { MarkerType, Place } from "../../types/markerTypes";
import CustomMarker from "./CustomMarker";
import { LatLng } from "leaflet";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

type Props = {
  markers: Place[];
  add: boolean;
  setCurrentMarker: (marker: Place) => void;
  currentMarker: Place;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export const Markers: React.FC<Props> = ({
  add,
  setCurrentMarker,
  markers,
  setPlaces,
  currentMarker,
  setLoading,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [tempPlace, setTempPlace] = useState<Place>(null);

  const map = useMap();
  const toast = useToast();
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
      console.log("here");
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
    if (timeRemaining === 1) {
      setLoading(true);
    }
  }, [timeRemaining]);

  const fetchData = async (ne: LatLng, sw: LatLng) => {
    const response = await axios(
      `api/place/getallbyarea?nelat=${ne.lat}&nelng=${ne.lng}&swlat=${sw.lat}&swlng=${sw.lng}`
    );
    const data = await response.data;

    if (response.status === 200) {
      if (tempPlace !== null) {
        data.push(currentMarker);
      }
      setPlaces(data);
      toast({
        title: `Area search success!`,
        status: "success",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Error fetching places in area!`,
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleMove = () => {
    setIsPanning(true);
    setLoading(false);
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
