import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import dynamic from "next/dynamic";

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

  return <MapWithNoSSR></MapWithNoSSR>;
};

export default Blog;
