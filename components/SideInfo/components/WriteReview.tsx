import { StarIcon } from "@chakra-ui/icons";
import { Stack, HStack, Textarea, Button, Image, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { ReviewWithUser } from "./Reviews";
import { Place } from "../../../types/markerTypes";

const WriteReview = ({
  place,
  addReview,
  setAddReview,
  setReviews,
  setAverageRating,
  getRatings,
  setCurrentPlace,
}: {
  place: any;
  addReview: boolean;
  setAddReview: Dispatch<SetStateAction<boolean>>;
  setReviews: Dispatch<SetStateAction<ReviewWithUser[]>>;
  setAverageRating: Dispatch<SetStateAction<number>>;
  getRatings: () => void;
  setCurrentPlace: React.Dispatch<React.SetStateAction<Place>>;
}) => {
  const { data: session, status } = useSession();

  const [content, setContent] = useState<string>(""); // content of review
  const [rating, setRating] = useState<number>(null); // rating of review

  const submitReview = async () => {
    if (!session) console.log("Not logged in");
    else {
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
        console.log(data);
        setAverageRating(data.averageRating);
        setCurrentPlace((prev) => {
          return {
            ...prev,
            averageRating: data.averageRating,
          };
        });

        getRatings();
      }
    }
  };

  return (
    <Stack>
      <HStack justify={"space-between"}>
        <HStack>
          <Image
            src={session.user.image}
            boxSize={"35px"}
            borderRadius={"full"}
          />
          <Text>{session.user.name}</Text>
        </HStack>
        <HStack>
          <Text>Rating: </Text>
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <StarIcon
                color={index <= rating ? "#ffc40c" : "#BEBEBE"}
                boxSize="13px"
                key={index}
                onClick={() => {
                  setRating(index);
                }}
                cursor={"pointer"}
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

      <Button>Add a photo</Button>

      <HStack justify={"flex-end"}>
        <Button
          onClick={() => {
            setAddReview(false);
          }}
        >
          Cancel
        </Button>
        <Button
          isDisabled={!rating || !content}
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
