// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      // populate: {
      //   cover: { fields: ["url"] },
      //   category: { populate: "*" },
      //   authorsBio: {
      //     populate: "*",
      //   },
      // },
      populate: "*",
      pagination: {
        start: 0,
        limit: 50,
      },
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };

    const mergedOptions = {
      next: { revalidate: 60 },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/cards${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data, " + err });
  }
}
