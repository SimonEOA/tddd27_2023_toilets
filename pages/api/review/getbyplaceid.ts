import prisma from "../../../lib/prisma";

export default async function getPlaceById(req, res) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        placeId: req.query.place,
      },
      include: {
        user: true,
      },
    });

    console.log(reviews);
    res.status(200).json(reviews);
    return reviews;
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error creating place" });
  } finally {
    await prisma.$disconnect();
  }
}
