// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const mergedOptions = {
      next: { revalidate: 60 },
      ...options,
    };

    const requestUrl = "http://api.open-notify.org/iss-now.json";

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data, " + err });
  }
}
