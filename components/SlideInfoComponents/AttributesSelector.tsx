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
import { ATTRIBUTE_IMAGES } from "../Attributes";
import Image from "next/image";
import { useState, useEffect } from "react";
import useOpenClose from "../../hooks/useOpenClose";

interface AttributesProps {
  updateAttributes: (attributes: string[]) => void;
}

export default function AttributesSelector({
  updateAttributes,
}: AttributesProps) {
  const [selectedImages, setSelectedImages] = useState([]);
  const { isOpen, toggle, close, open } = useOpenClose();

  const handleImageClick = (key) => {
    if (selectedImages.includes(key)) {
      setSelectedImages((prev) => prev.filter((item) => item !== key));
      updateAttributes(selectedImages.filter((item) => item !== key));
    } else {
      setSelectedImages((prev) => [...prev, key]);
      updateAttributes([...selectedImages, key]);
    }
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
