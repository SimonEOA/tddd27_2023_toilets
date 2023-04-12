import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Heading, VStack } from "@chakra-ui/react";

const Blog = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <VStack h="100%" justifyContent={"center"}>
      <Heading>Vacker karta</Heading>

      <MapWithNoSSR width="50vw" height="50vh"></MapWithNoSSR>
    </VStack>
  );
};

export default Blog;
