import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import Toilet from "../public/toiletimage.png";
import dynamic from "next/dynamic";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";

type Props = {
  feed: PostProps[];
};

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
