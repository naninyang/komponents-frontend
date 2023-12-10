import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data } = await response.json();

    const sitemapData = data.map((item: any) => ({
      id: item.id,
      created: item.attributes.createdAt,
    }));

    res.status(200).json({ data: sitemapData });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
}
