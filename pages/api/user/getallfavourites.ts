import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { email } = session.user;

  console.log(email);

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { favoritePlaces: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const favoritePlaces = user.favoritePlaces;

    res.status(200).json(favoritePlaces);
    return favoritePlaces;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving favorite places." });
  } finally {
    await prisma.$disconnect();
  }
}
