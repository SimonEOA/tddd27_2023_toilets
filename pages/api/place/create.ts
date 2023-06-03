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
    description,
    verified,
    images,
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
        description,
        verified,
        owner: {
          connect: { id: ownerId },
        },
        images,
      },
    });

    res.status(200).json(place);
  } catch (e) {
    res.status(500).json({ error: "Error creating place" });
  } finally {
    await prisma.$disconnect();
  }
}
