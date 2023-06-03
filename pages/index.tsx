import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { VStack } from "@chakra-ui/react";

import { Place } from "../types/markerTypes";
import Header from "../components/Header";

const Blog = () => {
  const Map = dynamic(() => import("../components/Map/Map"), {
    ssr: false, // disable server-side rendering
  });

  return (
    <>
      <Header />
      <VStack h="100%" justifyContent={"center"}>
        <Map width="100vw" height="80vh"></Map>
      </VStack>
    </>
  );
};

export default Blog;
