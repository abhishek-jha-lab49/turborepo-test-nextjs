import { NextApiRequest, NextApiResponse } from 'next';

import { getUser } from './apihelper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = parseInt(req.query.userId as string);
  if (userId && isFinite(userId) && userId > 0) {
    res.status(200).json(getUser(userId));
  } else {
    res.status(400).json({
      error: 'Invalid UserId',
    });
  }
}
