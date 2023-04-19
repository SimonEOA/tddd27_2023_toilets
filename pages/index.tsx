import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Button, Spacer, VStack } from "@chakra-ui/react";

const Blog = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <VStack h="100%" justifyContent={"center"}>
      <Spacer />
      <MapWithNoSSR width="100vw" height="75vh"></MapWithNoSSR>
    </VStack>
  );
};

export default Blog;
