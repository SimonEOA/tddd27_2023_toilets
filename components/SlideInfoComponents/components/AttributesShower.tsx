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
  attributes: string[];
}

export default function AttributesShower({ attributes }: AttributesProps) {
  const [selectedImages, setSelectedImages] = useState([]);

  const { data: session, status } = useSession();

  return (
    <Flex justify={"space-between"} align={"center"} padding={"1em"}>
      {attributes.map((key) => (
        <Flex
          key={key}
          justify={"center"}
          align={"center"}
          _hover={{
            cursor: "pointer",
            transform: "scale(1.1)",
          }}
          border={selectedImages.includes(key) ? "2px solid black" : "none"}
        >
          <Image src={ATTRIBUTE_IMAGES[key]} alt={key} width={48} height={48} />
        </Flex>
      ))}
    </Flex>
  );
}
