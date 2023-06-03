import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ShowImage = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  return (
    <VStack>
      {images.length > 0 ? (
        <Image
          src={
            "https://pagiebgcabtgpsyxzcrw.supabase.co/storage/v1/object/public/bucket-1/images/" +
            images[currentImageIndex]
          }
          alt="Selected"
          width={"100%"}
          height={"30vh"}
          objectFit="cover"
        />
      ) : (
        <Image
          src={"001-public-toilet.png"}
          alt="Selected"
          width={"100%"}
          height={"30vh"}
          objectFit="cover"
        />
      )}
      {images.length > 1 && (
        <HStack>
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon />}
            onClick={handlePreviousImage}
            size="sm"
          />
          <Text>
            {"Image: " + (currentImageIndex + 1) + " of " + images.length}
          </Text>
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon />}
            onClick={handleNextImage}
            size="sm"
          />
        </HStack>
      )}
    </VStack>
  );
};

export default ShowImage;
