// create a hook fo r adding a marker to the database
// this hook is used in the AddMarker component
// this hook is used in the AddMarker component
import { PrismaClient } from '@prisma/client';import {MarkerType} from '../types/markerTypes';
import { useSession } from 'next-auth/react';
import { useState } from 'react';


export const useAddMarker = async (marker: MarkerType, name: string, id: string) => {
    const [data, setData] = useState<any>([]);
   
    

    const createMarker = async () => {
        const res = await fetch('/api/place/create', {
            method: 'POST',
            body: JSON.stringify({ name: name, address: "SIMONS väg 1", attributes: ["test"], rating: 5, longitude: marker.position.lng, latitude: marker.position.lat, ownerId: id}),
            headers: {
              'Content-Type': 'application/json'
            },
          });
          setData(res.json());
    };


    
    return {data, createMarker};
    
}