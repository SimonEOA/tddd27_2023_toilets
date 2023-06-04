import {
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Place } from "../../../types/markerTypes";
import ImageUpload from "../../ImageComponents/ImageUpload";
import Attributes from "./AttributesSelector";

export const CreatePlace = ({
  place,
  setCurrentPlace,
  setPlaces,
  isOpen,
  setYourPlaces,
}: {
  place: Place;
  setCurrentPlace: Dispatch<SetStateAction<Place>>;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  isOpen: boolean;
  setYourPlaces: Dispatch<SetStateAction<Place[]>>;
}) => {
  if (!place) return null;
  if (!isOpen) return null;
  const [attributes, setAttributes] = useState<string[]>([]);

  const [imageNames, setImageNames] = useState<string[]>([]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];
      const imageName = imageNames[i];
      const formData = new FormData();
      formData.append("file", image, imageName); // Append the file with the generated imageName

      try {
        const response = await fetch("/api/image/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // Handle successful upload
          setImageNames((prevImageNames) => [...prevImageNames, imageName]); // Update the imageNames state
        } else {
          console.error("Upload error");
          // Handle upload error
        }
      } catch (error) {
        console.error("Upload error:", error);
        // Handle upload error
      }
    }
  };

  const { data: session, status } = useSession();
  const toast = useToast();

  const addPlace = async () => {
    if (!session) {
      toast({
        title: `Not Logged In!`,
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    } else if (place.verified) {
      toast({
        title: `Place Not Verified!`,
        status: "error",
        variant: "subtle",

        isClosable: true,
      });
    } else {
      try {
        setLoading(true);
        await handleUpload(); // Wait for image uploads to finish

        const res = await fetch("/api/place/create", {
          method: "POST",
          body: JSON.stringify({
            name: session.user.name,
            address: place.address,
            attributes: attributes,
            rating: 0,
            longitude: place.longitude,
            latitude: place.latitude,
            ownerId: session.user.id,
            description: place?.description || "",
            verified: true,
            images: imageNames, // Use the uploaded image names
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.status === 200) {
          setPlaces((prev) => [...prev, data]);
          setCurrentPlace(data);
          setPlaces((prev) => prev.filter((place) => place.id !== null));
          setYourPlaces((prev) => [...prev, data]);
          toast({
            title: `Place added!`,
            status: "success",
            variant: "subtle",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: `Error Adding Place!`,
            status: "error",
            variant: "subtle",

            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error creating place:", error);
        // Handle error creating place
      }
      setLoading(false);
    }
  };

  const updateAttributes = (attributes: string[]) => {
    setAttributes(attributes);
    setCurrentPlace((prev) => ({
      ...prev,
      attributes: attributes,
    }));
  };

  return (
    <Flex w={"100%"} align={"center"} justify={"center"} direction={"column"}>
      <ImageUpload
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setImageNames={setImageNames}
      />
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Name:</Text>
        <Input
          placeholder="Write name..."
          size="sm"
          value={place ? place?.address : ""}
          onChange={(e) => {
            setCurrentPlace((prev) => ({
              ...prev,
              address: e.target.value,
            }));
          }}
        ></Input>
      </Stack>
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Description</Text>
        <Textarea
          placeholder="Write description..."
          size="sm"
          value={place ? place.description : ""}
          onChange={(e) => {
            setCurrentPlace((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        ></Textarea>
      </Stack>
      <Stack justify={"space-between"} w="90%" mt="10px">
        <Text fontSize="md">Attributes</Text>
        <Attributes place={place} updateAttributes={updateAttributes} />
      </Stack>

      <Button mt="10px" onClick={addPlace} isLoading={loading}>
        Save
      </Button>
    </Flex>
  );
};
