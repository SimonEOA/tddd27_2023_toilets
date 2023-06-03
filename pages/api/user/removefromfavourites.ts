import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const place = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        favoritePlaces: {
          disconnect: {
            id: req.body.placeId,
          },
        },
      },
    });

    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error removing from favorite places." });
  } finally {
    await prisma.$disconnect();
  }
}
