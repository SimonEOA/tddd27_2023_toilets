import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ImageUpload = ({
  selectedImages,
  setSelectedImages,
  setImageNames,
}: {
  selectedImages: File[];
  setSelectedImages: Dispatch<SetStateAction<File[]>>;
  setImageNames: Dispatch<SetStateAction<string[]>>;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    for (let i = 0; i < files.length; i++) {
      setImageNames((prevImageNames) => [...prevImageNames, uuidv4()]); // Update the imageNames state
    }

    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...files]);

    for (let i = 0; i < files.length; i++) {
      setImageNames((prevImageNames) => [...prevImageNames, uuidv4()]); // Update the imageNames state
    }
  };

  const handleRemoveImage = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setImageNames((prevImageNames) => {
      const updatedImageNames = [...prevImageNames];
      updatedImageNames.splice(index, 1);
      return updatedImageNames;
    });
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <VStack>
      <VStack
        width="300px"
        height="300px"
        border="2px dashed"
        borderRadius="lg"
        borderColor="gray.200"
        spacing={4}
        alignItems="center"
        justifyContent="center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {selectedImages.length > 0 ? (
          <Box width="100%" height="100%" position="relative">
            <Image
              src={URL.createObjectURL(selectedImages[currentImageIndex])}
              alt="Selected"
              width={300}
              height={300}
              objectFit="cover"
            />
            <IconButton
              position="absolute"
              top={1}
              right={1}
              onClick={(event) => handleRemoveImage(currentImageIndex, event)}
              size="sm"
              aria-label={""}
              icon={<CloseIcon />}
            ></IconButton>
          </Box>
        ) : (
          <Text>Click or drag and drop an image here</Text>
        )}
      </VStack>
      {selectedImages.length > 1 && (
        <HStack>
          <Button onClick={handlePreviousImage}>Previous</Button>
          <Text>
            {"Image: " +
              (currentImageIndex + 1) +
              " of " +
              selectedImages.length}
          </Text>
          <Button onClick={handleNextImage}>Next</Button>
        </HStack>
      )}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
    </VStack>
  );
};

export default ImageUpload;
