import { faker } from '@faker-js/faker';

import { IMarketData, IUserData, IUserInvestments, IUsers } from '../../common/types';

let globalWithUserData = global as typeof globalThis & { userData: IUserData };
let userData: IUserData = {};

if (!globalWithUserData.userData) {
  globalWithUserData.userData = {};
}
userData = globalWithUserData.userData;

export const marketData: Array<IMarketData> = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sharePrice: 173.97,
    sector: 'Information Technology',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sharePrice: 346.07,
    sector: 'Information Technology',
  },
  {
    symbol: 'GOOG',
    name: 'Alphabet Inc. Class C Capital Stock',
    sharePrice: 127.57,
    sector: 'Information Technology',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. Class A',
    sharePrice: 126.45,
    sector: 'Communication Services',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    sharePrice: 137,
    sector: 'Consumer Discretionary',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sharePrice: 423.25,
    sector: 'Communication Services',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc. Class A',
    sharePrice: 311.85,
    sector: 'Real Estate',
  },
  {
    symbol: 'BRK/A',
    name: 'Berkshire Hathaway Inc.',
    sharePrice: 523,
    sector: 'Consumer Staples',
  },
  {
    symbol: 'BRK/B',
    name: 'Berkshire Hathaway Inc.',
    sharePrice: 343.75,
    sector: 'Materials',
  },
  {
    symbol: 'HSBC',
    name: 'HSBC Holdings, plc.',
    sharePrice: 36.26,
    sector: 'Industrials',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sharePrice: 205.66,
    sector: 'Consumer Discretionary',
  },
  {
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    sharePrice: 554.46,
    sector: 'Healthcare',
  },
  {
    symbol: 'UNH',
    name: 'UnitedHealth Group Incorporated',
    sharePrice: 531.6,
    sector: 'Real Estate',
  },
  {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor Manufacturing Company Ltd.',
    sharePrice: 87.8,
    sector: 'Communication Services',
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    sharePrice: 238.58,
    sector: 'Energy',
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    sharePrice: 164.87,
    sector: 'Materials',
  },
  {
    symbol: 'SHEL',
    name: 'Shell PLC American Depositary Shares',
    sharePrice: 65.39,
    sector: 'Utilities',
  },
  {
    symbol: 'NVO',
    name: 'Novo Nordisk A/S',
    sharePrice: 97.68,
    sector: 'Consumer Staples',
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    sharePrice: 105.64,
    sector: 'Real Estate',
  },
  {
    symbol: 'JPM',
    name: 'JP Morgan Chase & Co.',
    sharePrice: 138.94,
    sector: 'Financials',
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    sharePrice: 148.69,
    sector: 'Consumer Discretionary',
  },
  {
    symbol: 'MA',
    name: 'Mastercard Incorporated',
    sharePrice: 377.82,
    sector: 'Financials',
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Company',
    sharePrice: 149.61,
    sector: 'Healthcare',
  },
  {
    symbol: 'AVGO',
    name: 'Broadcom Inc.',
    sharePrice: 852.94,
    sector: 'Utilities',
  },
  {
    symbol: 'BHP',
    name: 'BHP Group Limited American Depositary Shares (Each representing two Ordinary Shares)',
    sharePrice: 57.93,
    sector: 'Industrials',
  },
];

export const userNameMap: Array<IUsers> = [
  { userId: 1, name: 'Hilton McArtan' },
  { userId: 2, name: 'Werner Bolderson' },
  { userId: 3, name: 'Nikki Tschirasche' },
  { userId: 4, name: 'Linnie Shanahan' },
  { userId: 5, name: 'Goddart Goley' },
  { userId: 6, name: 'Jess Larrie' },
  { userId: 7, name: 'Courtney Mattys' },
  { userId: 8, name: 'Carolann Pes' },
  { userId: 9, name: 'Lloyd Pendrill' },
  { userId: 10, name: 'Claire Dundendale' },
];

const generateData = (userId: number) => {
  const data = {
    name: userNameMap.find((user: IUsers) => user.userId == userId)?.name,
    avatar: faker.image.avatarGitHub(),
    investments: faker.helpers
      .arrayElements(marketData, { min: 1, max: 10 })
      .map((mktData: IMarketData) => {
        const shares = faker.number.int({ min: 50, max: 1000 });
        return {
          symbol: mktData.symbol,
          name: mktData.name,
          shares,
          sharePrice: mktData.sharePrice,
          ttlInv: shares * mktData.sharePrice,
          sector: mktData.sector,
        };
      }),
  };
  userData[userId] = data;
  return data;
};

export const getUser = (userId: number) => {
  const { name, avatar } = userData[userId] || generateData(userId);
  return { name, avatar };
};

export const getInvestments = (userId: number) => {
  const { investments } = userData[userId] || generateData(userId);
  return investments;
};

export const saveInvestment = (
  userId: number,
  symbol: string,
  name: string,
  shares: number,
  sharePrice: number,
  sector: string,
) => {
  const investmentExists = userData[userId]?.investments?.find(
    (investment: IUserInvestments) => investment.symbol === symbol,
  );
  if (investmentExists) {
    investmentExists.shares = shares;
    investmentExists.ttlInv = investmentExists.shares * sharePrice;
  } else {
    userData[userId]?.investments?.push({
      symbol,
      name,
      shares,
      sharePrice,
      ttlInv: shares * sharePrice,
      sector,
    });
  }
  return userData[userId].investments;
};
