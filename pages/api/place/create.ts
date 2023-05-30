import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const {
    name,
    address,
    attributes,
    rating,
    longitude,
    latitude,
    ownerId,
    verified,
  } = req.body;

  try {
    const place = await prisma.place.create({
      data: {
        name,
        address,
        attributes: {
          set: attributes,
        },
        rating,
        longitude,
        latitude,
        verified,
        owner: {
          connect: { id: ownerId },
        },
      },
    });

    res.status(200).json(place);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error creating place" });
  } finally {
    await prisma.$disconnect();
  }
}
