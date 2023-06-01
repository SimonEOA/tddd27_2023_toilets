import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase";
import formidable from "formidable";
import { createReadStream } from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: "Upload error" });
      }

      const { file } = files;

      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      const stream = createReadStream(file.filepath);

      const { data, error } = await supabase.storage
        .from("bucket-1") // Replace with your actual bucket name
        .upload(`images/${file.originalFilename}`, stream, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg", // Set the Content-Type header
        });

      console.log("data", data);
      console.log("error", error);

      if (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: "Upload error" });
      } else if (data) {
        console.log("Upload successful:", data);
        // Do something with the uploaded file, such as saving its URL to a database

        return res.status(200).json({ message: "Upload successful" });
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload error" });
  }
}
