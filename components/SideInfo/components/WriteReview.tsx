import {
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FaToiletPaper } from "react-icons/fa";
import { Place } from "../../../types/markerTypes";
import { ReviewWithUser } from "./Reviews";

const WriteReview = ({
  place,
  setAddReview,
  setReviews,
  setAverageRating,
  getRatings,
  setCurrentPlace,
}: {
  place: any;
  setAddReview: Dispatch<SetStateAction<boolean>>;
  setReviews: Dispatch<SetStateAction<ReviewWithUser[]>>;
  setAverageRating: Dispatch<SetStateAction<number>>;
  getRatings: () => void;
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place>>;
}) => {
  const { data: session, status } = useSession();

  const [content, setContent] = useState<string>(""); // content of review
  const [rating, setRating] = useState<number>(0); // rating of review
  const [loading, setLoading] = useState<boolean>(false); // loading state for submit button

  const toast = useToast();

  const submitReview = async () => {
    if (!session) {
      toast({
        title: "You must be signed in to leave a review.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setLoading(true);
      const res = await fetch("/api/review/create", {
        method: "POST",
        body: JSON.stringify({
          content: content,
          rating: rating,
          placeId: place.id,
          userId: session.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setAddReview(false);
      if (res.status === 200) {
        setReviews((prev) => [...prev, data.review]);
        setAverageRating(data.averageRating);
        setCurrentPlace((prev) => {
          return {
            ...prev,
            averageRating: data.averageRating,
          };
        });

        toast({
          title: "Review submitted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        getRatings();
      }
      setLoading(false);
    }
  };

  return (
    <Stack>
      <HStack justify={"space-between"}>
        <HStack>
          <Image
            src={session?.user.image}
            boxSize={"35px"}
            borderRadius={"full"}
          />
          <Text>{session?.user.name}</Text>
        </HStack>
        <HStack>
          <Text>Rating: </Text>
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <Icon
                color={index <= rating ? "lightblue" : "#BEBEBE"}
                boxSize="13px"
                key={index}
                onClick={() => {
                  setRating(index);
                }}
                cursor={"pointer"}
                as={FaToiletPaper}
              />
            );
          })}
        </HStack>
      </HStack>

      <Textarea
        placeholder="Write your review here..."
        my={2}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></Textarea>

      <HStack justify={"flex-end"}>
        <Button
          onClick={() => {
            setAddReview(false);
          }}
          isLoading={loading}
        >
          Cancel
        </Button>
        <Button
          isDisabled={!rating || !content}
          isLoading={loading}
          onClick={() => {
            submitReview();
          }}
        >
          Submit
        </Button>
      </HStack>
    </Stack>
  );
};

export default WriteReview;
