export type Point = {
  lat: number;
  lng: number;
};

export type MarkerType = {
  position: Point;
  info: string;
};

export type Place = {
  images: string[];
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  verified: boolean;
  rating: number;
  description?: string;
  attributes?: string[];
};
