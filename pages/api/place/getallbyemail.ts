import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { email } = session?.user;

  try {
    const places = await prisma.place.findMany({
      //get all places where email is equal to the email of the user
      where: {
        owner: {
          email: email,
        },
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
