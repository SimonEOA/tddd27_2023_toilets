import { Box, Button, HStack, Slide, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useOpenClose from "../hooks/useOpenClose";

const SideInfo = () => {
  const { isOpen, toggle, close, open } = useOpenClose();
  return (
    <HStack justify={"center"}>
      <Box
        position={"fixed"}
        top="0"
        left={"0"}
        right={"0"}
        height={"100vh"}
        width={"20vh"}
        bg="gray.100"
        zIndex={9999}
        rounded={"xl"}
        transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
        transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
        opacity={isOpen ? 1 : 0}
      >
        {isOpen && <Button onClick={close}>Close</Button>}
      </Box>
      <Button onClick={toggle}></Button>
    </HStack>
  );
};

export default SideInfo;
