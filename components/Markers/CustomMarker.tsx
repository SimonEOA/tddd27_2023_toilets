import { Icon } from "leaflet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Place, Point } from "../../types/markerTypes";
import CustomPopupBox from "./CustomPopupBox";

const ToiletIcon = new Icon({
  iconUrl: "/002-bathroom.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

interface CustomMarkerProps {
  place: Place;
  setCurrentMarker: (marker: Place) => void;
  currentMarker: Place;
  onRemove: () => void;
  onOpen: (open: boolean) => void;
  onClosed: () => void;
}

export default function CustomMarker({
  place,
  setCurrentMarker,
  currentMarker,
  onRemove,
  onOpen,
  onClosed,
}: CustomMarkerProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const markerRef = useRef(null);
  const popupref = useRef(null);

  function handlePopupOpen() {
    setCurrentMarker(place);
    onOpen(true);
    setPopupOpen(true);
  }

  function handlePopupClose() {
    setCurrentMarker(null);
    onOpen(false);
    onClosed();
    setPopupOpen(false);
  }

  const map = useMap();

  useEffect(() => {
    if (currentMarker?.id === null) markerRef.current.openPopup();
  }, []);

  const point: Point = { lat: place.latitude, lng: place.longitude };
  return (
    <Marker
      position={point}
      icon={ToiletIcon}
      eventHandlers={{
        popupopen: () => handlePopupOpen(),
        popupclose: () => handlePopupClose(),
        click: () => {
          if (popupOpen) {
            onRemove();
          }
        },
      }}
      ref={markerRef}
    >
      <Popup ref={popupref} closeButton={false} closeOnEscapeKey={false}>
        <CustomPopupBox place={currentMarker} />
      </Popup>
    </Marker>
  );
}
