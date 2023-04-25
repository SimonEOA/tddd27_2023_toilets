import {
  Box,
  Button,
  HStack,
  Slide,
  VStack,
  useDisclosure,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useOpenClose from "../hooks/useOpenClose";

const SideInfo = () => {
  const { isOpen, toggle, close, open } = useOpenClose();
  return (
    <HStack justify={"center"}>
      <Box
        position={"fixed"}
        top="60px"
        left={"0"}
        height={"calc(100vh - 60px)"}
        width={"400px"}
        bg="gray.100"
        zIndex={9999}
        rounded={"xl"}
        transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
        transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
        opacity={isOpen ? 1 : 0}
      >
        <VStack overflow={"auto"} paddingY="20px">
          <Flex w={"100%"} align={"center"} justify={"center"}>
            {" "}
            <Image
              fallbackSrc="/001-public-toilet.png"
              maxW={"100%"}
              h="250px"
            />
          </Flex>
        </VStack>
      </Box>
      <Button onClick={toggle}></Button>
    </HStack>
  );
};

export default SideInfo;
