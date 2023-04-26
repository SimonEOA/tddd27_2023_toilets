import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const reviewCounts = await prisma.review.groupBy({
      where: {
        placeId: req.query.place,
      },
      by: ["rating"],
      _count: {
        rating: true,
      },
    });

    // Create a new array to hold the updated review counts
    const updatedReviewCounts = [];

    // Iterate over the range of possible ratings (1-5) and check if there are counts for each rating
    let highestRating = { rating: 0, count: 0 };
    for (let i = 5; i > 0; i--) {
      const matchingCount = reviewCounts.find((count) => count.rating === i);
      if (matchingCount) {
        if (matchingCount._count.rating > highestRating.count) {
          highestRating = {
            rating: matchingCount.rating,
            count: matchingCount._count.rating,
          };
        }

        // If there is a count for the rating, add it to the updated array
        updatedReviewCounts.push({
          rating: matchingCount.rating,
          count: matchingCount._count.rating,
        });
      } else {
        // If there is no count for the rating, add it to the updated array with a count of 0
        updatedReviewCounts.push({
          rating: i,
          count: 0,
        });
      }
    }

    // Return the updated review counts
    const ratings = {
      highest: highestRating,
      ratingCounts: updatedReviewCounts,
    };
    res.status(200).json(ratings);
    console.log(ratings);
    return ratings;
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error when getting ratings" });
  } finally {
    await prisma.$disconnect();
  }
}
