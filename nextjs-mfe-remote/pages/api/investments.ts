import { NextApiRequest, NextApiResponse } from 'next';

import { getInvestments, saveInvestment } from './apihelper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
    return res.status(200).json({});
  }

  if (req.method === 'POST') {
    const { userId, symbol, name, shares, sharePrice, sector } = req.body;
    res.status(200).json(saveInvestment(userId, symbol, name, shares, sharePrice, sector));
  } else {
    const userId = parseInt(req.query.userId as string);
    if (userId && isFinite(userId) && userId > 0) {
      res.status(200).json(getInvestments(userId));
    } else {
      res.status(400).json({
        error: 'Invalid UserId',
      });
    }
  }
}
