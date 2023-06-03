import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const places = await prisma.place.findMany({
      include: {
        owner: true,
      },
    });
    res.status(200).json(places);
    return places;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
