import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { content, rating, userId, placeId } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        content,
        rating,
        user: {
          connect: { id: userId },
        },
        place: {
          connect: { id: placeId },
        },
      },
      include: {
        user: true,
      },
    });

    const averageRating = await prisma.review.aggregate({
      where: {
        placeId: placeId,
      },
      _avg: {
        rating: true,
      },
    });

    const updatedPlace = await prisma.place.update({
      where: {
        id: placeId,
      },
      data: {
        rating: averageRating._avg.rating,
      },
    });

    const result = {
      review: review,
      averageRating: averageRating._avg.rating,
    };
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error creating place" });
  } finally {
    await prisma.$disconnect();
  }
}
