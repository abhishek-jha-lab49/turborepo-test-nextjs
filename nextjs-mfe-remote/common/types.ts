export interface IUserData {
  [key: number]: {
    name?: string;
    avatar?: string;
    investments?: Array<IUserInvestments>;
  };
}

export interface IUserInvestments {
  symbol?: string;
  name?: string;
  shares?: number;
  sharePrice?: number;
  ttlInv?: number;
  sector?: string;
}

export interface IUsers {
  userId: number;
  name: string;
}

export interface IMarketData {
  symbol: string;
  name: string;
  sharePrice: number;
  sector: string;
}

export interface IMessage {
  type: string;
  data: any;
}

export interface ISnapshot {
  securities?: number;
  sectors?: number;
  investmentValue?: string;
}
