import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = Number(req.query.page) || 1;
    const response = await fetch(
      `${process.env.STRAPI_URL}?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=12`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const pageCount = data.meta.pagination.pageCount;
    const responseData = {
      data: data,
      pageCount: pageCount,
    };
    res.status(200).json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.log('error: ', error);
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
}
