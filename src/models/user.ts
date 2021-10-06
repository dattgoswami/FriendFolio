// import redis from 'redis';
import { Transaction } from './transaction';
// import users from '../../mock_data/data.json';

//redis
// const redisPort: number = 6379;
// const client = redis.createClient(redisPort);

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  friends: number[];
  transactions: Transaction[];
};

export class UserCollection {
  constructor() {
    //assign the data read from the data.json to the userList array (of users)
  }
  public addUser(user: User) {
    //stub to add single user to the dataset
  }
  public getUser(id: number) {
    //retrieve specific user from the dataset
  }
  //returns a list of user IDs (strings that uniquely identify a user) representing the friends of a user
  static getFriendsForUser(idValue: number): number[] {
    //userList.find(u => u.id === idValue).friends;
    if (idValue < 0) {
      throw Error('invalid user id');
    }
    return [2, 3, 5, 6];
  }
  //returns a list of trades represented by a string “<date>,<BUY|SELL>,<ticker>”, e.g. “2014-01-01,BUY,GOOG”, ordered by trade date with the most recent trade first in the list
  static getTradeTransactionsForUser(idValue: number): Transaction[] {
    // ideally it would return an array of transactions :Transactions[]
    //userList.find(u => u.id === idValue).transactions;
    //currently the trades are being sent as objects they can be modified to be sent in the form required
    return [
      {
        id: 1,
        time: '2021-09-28',
        type: 'BUY',
        quantity: 10,
        ticker: 'GOOG'
      },
      {
        id: 2,
        time: '2021-09-29',
        type: 'SELL',
        quantity: 5,
        ticker: 'FB'
      },
      {
        id: 3,
        time: '2021-09-15',
        type: 'BUY',
        quantity: 2,
        ticker: 'NFLX'
      }
    ];
  }
}
