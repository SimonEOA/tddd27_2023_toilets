import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Tab,
  Text,
  Textarea,
  Image,
  Progress,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Review, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Place } from "../../types/markerTypes";

interface ReviewCount {
  rating: number;
  count: number;
}

interface ReviewWithUser extends Review {
  user?: User;
}

export const Reviews = ({ place }: { place: Place }) => {
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [ratings, setRatings] = useState<ReviewCount[]>([]);
  const [highestRating, setHighestRating] = useState<ReviewCount>(null);

  const [review, setReview] = useState<Review>(null); // review to be added

  const [content, setContent] = useState<string>(""); // content of review
  const [rating, setRating] = useState<number>(null); // rating of review

  const [addReview, setAddReview] = useState(false); // toggle add review form

  const { data: session, status } = useSession();

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
    }
  };

  const getReviews = async () => {
    const res = await fetch(`/api/review/getbyplaceid?place=${place.id}`, {
      method: "GET",
    });
    const data = await res.json();
    setReviews(data);
  };

  const getRatings = async () => {
    const res = await fetch(`/api/review/getratings?place=${place.id}`, {
      method: "GET",
    });
    const data = await res.json();

    setRatings(data.ratingCounts);
    setHighestRating(data.highest);
  };

  useEffect(() => {
    if (place) {
      getRatings();
      getReviews();
    }
  }, [place]);

  const getTimeSince = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    //return time if less than a day ago (86400 seconds), days if less than a month ago (2592000 seconds), months if less than a year ago (31536000 seconds), years otherwise
    if (seconds < 60) return seconds + " seconds ago";
    else if (minutes < 60) return minutes + " minutes ago";
    else if (hours < 24) return hours + " hours ago";
    else if (days < 30) return days + " days ago";
    else if (days < 365) return Math.floor(days / 30) + " months ago";
    else return Math.floor(days / 365) + " years ago";
  };

  return (
    <Box>
      {!addReview ? (
        <Stack>
          <HStack w="100%">
            <Stack w="100%">
              {ratings?.map((rat, index) => {
                let value =
                  100 / (highestRating?.count === 0 ? 1 : highestRating?.count);
                return (
                  <HStack key={index}>
                    <Text>{rat.rating}</Text>
                    <Progress
                      value={rat.count * value}
                      w="75%"
                      borderRadius={"full"}
                      size={"sm"}
                    ></Progress>
                  </HStack>
                );
              })}
            </Stack>

            <VStack>
              <Text fontWeight={"bold"} fontSize={"5xl"}>
                {place?.rating}
              </Text>
              <HStack>
                {[...Array(5)].map((_, index) => {
                  index += 1;
                  return (
                    <StarIcon
                      color={index <= place?.rating ? "#ffc40c" : "#BEBEBE"}
                      boxSize="13px"
                      key={index}
                    />
                  );
                })}
              </HStack>
              <Text>{reviews.length} reviews</Text>
              <Button
                onClick={() => {
                  setAddReview(true);
                }}
              >
                Write Review
              </Button>
            </VStack>
          </HStack>
          <Divider />
          {reviews.map((review) => {
            return (
              <Stack key={review.id}>
                <HStack justify={"space-between"}>
                  <HStack>
                    <Image
                      src={review.user.image}
                      boxSize={"35px"}
                      borderRadius={"full"}
                    />
                    <Text>{review.user.name}</Text>
                  </HStack>
                  <HStack>
                    <Text>Rating: </Text>
                    {[...Array(5)].map((_, index) => {
                      index += 1;
                      return (
                        <StarIcon
                          color={index <= review.rating ? "#ffc40c" : "#BEBEBE"}
                          boxSize="13px"
                          key={index}
                        />
                      );
                    })}
                  </HStack>
                </HStack>
                <Text fontSize={"13px"}>
                  {getTimeSince(new Date(review.createdAt))}
                </Text>
                <Text>{review.content}</Text>
                <Divider />
              </Stack>
            );
          })}
        </Stack>
      ) : (
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
      )}
    </Box>
  );
};
