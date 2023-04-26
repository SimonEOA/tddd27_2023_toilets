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
    });

    res.status(200).json(review);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error creating place" });
  } finally {
    await prisma.$disconnect();
  }
}
