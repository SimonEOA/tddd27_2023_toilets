import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useOpenClose from "../../../hooks/useOpenClose";
import { ATTRIBUTE_IMAGES } from "../../../types/Attributes";
import { Place } from "../../../types/markerTypes";

interface AttributesProps {
  updateAttributes: (attributes: string[]) => void;
  place: Place;
}

export default function AttributesSelector({
  updateAttributes,
  place,
}: AttributesProps) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (key) => {
    if (selectedImages.includes(key)) {
      updateAttributes(selectedImages.filter((item) => item !== key));
    } else {
      updateAttributes([...selectedImages, key]);
    }
  };
  useEffect(() => {
    if (place) {
      setSelectedImages(place.attributes);
    }
  }, [place]);

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
