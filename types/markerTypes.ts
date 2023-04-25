export type Point = {
  lat: number;
  lng: number;
};

export type MarkerType = {
  position: Point;
  info: string;
};

export type Place = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  verified: boolean;
};

