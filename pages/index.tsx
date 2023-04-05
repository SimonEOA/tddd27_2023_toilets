import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

import dynamic from "next/dynamic";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";

/**
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};
*/
type Props = {
  feed: PostProps[];
};

const Blog = () => {
  const MapWithNoSSR = dynamic(() => import("./Map"), {
    ssr: false,
  });

  return (
    <VStack h="100%" justifyContent={"center"}>
      <Heading>Vacker karta</Heading>

      <Box>
        <MapWithNoSSR width="50vw" height="50vh"></MapWithNoSSR>
      </Box>
    </VStack>
  );
};

export default Blog;
