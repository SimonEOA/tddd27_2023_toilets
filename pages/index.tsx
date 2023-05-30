import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { VStack } from "@chakra-ui/react";

import { Place } from "../types/markerTypes";

type Props = {
  markers: Place[];
};

const Blog = ({ markers }: Props) => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <>
      <VStack h="100%" justifyContent={"center"}>
        <MapWithNoSSR
          width="100vw"
          height="80vh"
          markers={markers}
        ></MapWithNoSSR>
      </VStack>
    </>
  );
};

export default Blog;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("http://localhost:3000/api/place/getall");
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      markers: data,
    },
  };
}
