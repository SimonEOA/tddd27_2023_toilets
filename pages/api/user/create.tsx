import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const result = await prisma.user.create({
    data: {
      name: session?.user?.name,
      email: session?.user?.email,
      // jti: session?.user?.jti,
    },
  });

  console.log(result);

  if (!result) {
    res.status(404);
    res.json({ error: "User already exist" });
    res.end();
  } else {
    res.status(200);
    res.json(result);
  }
}
