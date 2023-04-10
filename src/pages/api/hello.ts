// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get(
    "https://nodejs.dothinh.info/api/movies/getMovieByDate?from=2023-3-1&to=2023-4-1"
  );
  const data = response.data.data;
  res.status(200).json(data);
}

//ddos -> tấn công quá tải request
