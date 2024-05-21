import { NextApiRequest, NextApiResponse } from 'next';

import { userNameMap } from './apihelper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(userNameMap);
}
