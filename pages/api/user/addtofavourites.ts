import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const place = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        favoritePlaces: {
          connect: {
            id: req.body.placeId,
          },
        },
      },
    });

    res.status(200).json(place);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error adding to favorites place" });
  } finally {
    await prisma.$disconnect();
  }
}
