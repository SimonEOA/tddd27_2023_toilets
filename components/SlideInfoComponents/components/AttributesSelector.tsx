import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ATTRIBUTE_IMAGES } from "../../Attributes";
import Image from "next/image";
import { useState } from "react";

interface AttributesProps {
  setAttributes: any;
}

export default function AttributesSelector({ setAttributes }: AttributesProps) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (key) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(key)) {
        // If the image is already selected, remove it from the array
        return prevSelectedImages.filter((selectedKey) => selectedKey !== key);
      } else {
        // If the image is not selected, add it to the array
        return [...prevSelectedImages, key];
      }
    });
    setAttributes([...selectedImages, key]);
  };
  const { data: session, status } = useSession();

  return (
    <Flex justify={"space-between"} align={"center"} padding={"1em"}>
      {Object.entries(ATTRIBUTE_IMAGES).map(([key, value]) => (
        <Flex
          key={key}
          justify={"center"}
          align={"center"}
          _hover={{
            cursor: "pointer",
            transform: "scale(1.1)",
          }}
          onClick={() => {
            handleImageClick(key);
          }}
          border={selectedImages.includes(key) ? "2px solid black" : "none"}
        >
          <Image src={value} alt={key} width={48} height={48} />
        </Flex>
      ))}
    </Flex>
  );
}
