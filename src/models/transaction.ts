export type Transaction = {
  id: number;
  time: string; //"YYYY-MM-DD"
  type: string; //BUY / SELL
  quantity: number;
  ticker: string; //identifier GOOG, FB
};
