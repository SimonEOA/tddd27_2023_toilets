import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const { name, address, attributes, rating, longitude, latitude, ownerId } = req.body;

  const prisma = new PrismaClient();

  try {
    const place = await prisma.place.create({
      data: {
        name,
        address,
        attributes: {
          set: attributes
        },
        rating,
        longitude,
        latitude,
        owner: {
          connect: { id: ownerId }
        }
      },
    });

    res.status(200).json(place);
  } catch (e) {
    res.status(500).json({ error: 'Error creating place' });
  } finally {
    await prisma.$disconnect();
  }
}
