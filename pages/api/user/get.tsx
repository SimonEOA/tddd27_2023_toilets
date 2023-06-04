import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    res.status(404);
    res.json({ error: "User not found" });
    res.end();
  } else {
    res.status(200);
    res.json(user);
  }
}
