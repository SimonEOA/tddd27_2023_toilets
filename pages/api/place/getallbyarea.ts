import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nelat, nelng, swlat, swlng } = req.query;

  try {
    const places = await prisma.place.findMany({
      where: {
        AND: [
          {
            AND: [
              { latitude: { gte: parseFloat(swlat) } },
              { latitude: { lte: parseFloat(nelat) } },
            ],
          },
          {
            AND: [
              { longitude: { gte: parseFloat(swlng) } },
              { longitude: { lte: parseFloat(nelng) } },
            ],
          },
        ],
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
