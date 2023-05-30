export type MapType = {
    name: string;
    attributes: string;
    url: string;
}

export const StandardMap = {
    name: "Standard Map",
    attributes:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };

export const DarkMap = {
    name: 'Dark Map',
    attributes:'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    url: 'https:tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
}

export const CycleMap = {
    name: 'Cycle Map',
    attributes:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
}

export const MapList: MapType[] = [
    StandardMap,
    DarkMap,
    CycleMap
]

