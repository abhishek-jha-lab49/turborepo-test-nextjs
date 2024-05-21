import { NextApiRequest, NextApiResponse } from 'next';

import { marketData } from './apihelper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(marketData);
}
