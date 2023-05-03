import { useEffect, useState } from "react";
import { LayerGroup, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { MarkerType, Place } from "../../types/markerTypes";
import CustomMarker from "./CustomMarker";
import axios from "axios";
import { LatLng } from "leaflet";

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
  const [isPanning, setIsPanning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [tempPlace, setTempPlace] = useState<Place>(null);
  const map = useMap();
  // useMapEvent("click", (e) => {
  //   console.log(add, popupOpen, "YO");
  //   if (add && !popupOpen) {
  //     // if tmpPlace is not null then remove it from the map
  //     if (tempPlace) {
  //       setPlaces((prevMarkers) =>
  //         prevMarkers.filter((_, index) => index !== prevMarkers.length - 1)
  //       );
  //     }
  //     setPlaces((prevMarkers) => [
  //       ...prevMarkers,
  //       {
  //         id: null,
  //         name: null,
  //         address: null,
  //         latitude: e.latlng.lat,
  //         longitude: e.latlng.lng,
  //         verified: false,
  //         attributes: [],
  //         rating: 0,
  //       },
  //     ]);
  //     setTempPlace({
  //       id: "test",
  //       name: "test",
  //       address: "test",
  //       latitude: e.latlng.lat,
  //       longitude: e.latlng.lng,
  //       verified: false,
  //     });
  //     console.log("places", places);
  //   }
  // });

  const map2 = useMapEvent("popupclose", (e) => {
    setCurrentMarker(null);
  });

  const handlePopupOpen = (open: boolean) => {
    console.log("open", open);
    setPopupOpen(open);
  };

  const handleMarkerRemove = (indexToRemove) => {
    console.log("index", indexToRemove);
    console.log("places", places);
    setPlaces((prevMarkers) =>
      prevMarkers.filter((_, index) => index !== indexToRemove - 1)
    );
  };

  const handlePlaces = (place: Place) => {
    setPlaces([...places, place]);
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
    console.log(ne.lat, ne.lng, sw.lat, sw.lng);
    console.log(map.getCenter());
    const response = await axios(
      `api/place/getallbyarea?nelat=${ne.lat}&nelng=${ne.lng}&swlat=${sw.lat}&swlng=${sw.lng}`
    );
    const data = await response.data;
    if (tempPlace !== null) {
      data.push(tempPlace);
    }
    setPlaces(data);
  };

  const handleMove = () => {
    setIsPanning(true);
    setTimeRemaining(2);
  };

  useEffect(() => {
    map.on("move", handleMove);
    return () => {
      map.off("move", handleMove);
    };
  }, [map, handleMove]);

  return (
    <LayerGroup>
      {places.map((place, index) => (
        <CustomMarker
          key={index}
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
