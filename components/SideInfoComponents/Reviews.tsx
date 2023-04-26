import { Box, Button, Text } from "@chakra-ui/react";
import { Review } from "@prisma/client";
import { useState } from "react";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [review, setReview] = useState<Review>(null); // review to be added
  const [addReview, setAddReview] = useState(false); // toggle add review form

  return (
    <Box>
      <Button
        onClick={() => {
          setAddReview(true);
        }}
      >
        Add Review
      </Button>
    </Box>
  );
};
