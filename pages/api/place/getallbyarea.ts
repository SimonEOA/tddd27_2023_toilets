import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { _southWest, _northEast } = req.body;

  try {
    const places = await prisma.place.findMany({
        where: {
            AND: [
                {
                    latitude: {
                        gte: _southWest.lat,
                    },
                },
                {
                    latitude: {
                        lte: _northEast.lat,
                    },
                },
                {
                    longitude: {
                        gte: _southWest.lng,

                    },
                },
                {
                    longitude: {

                        lte: _northEast.lng,
                    },
                },
                
            ],
          },
        });
    // console.log(places);
    res.status(200).json(places);
    return places;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
