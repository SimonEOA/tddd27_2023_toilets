import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ATTRIBUTE_IMAGES } from "../../../types/Attributes";

interface AttributesProps {
  attributes: string[];
}

export default function AttributesShower({ attributes }: AttributesProps) {
  return (
    <Flex justify={"space-between"} align={"center"} padding={"1em"}>
      {attributes?.map((key) => (
        <Flex
          key={key}
          justify={"center"}
          align={"center"}
          _hover={{
            cursor: "pointer",
            transform: "scale(1.1)",
          }}
        >
          <Image src={ATTRIBUTE_IMAGES[key]} alt={key} width={30} height={30} />
        </Flex>
      ))}
    </Flex>
  );
}
