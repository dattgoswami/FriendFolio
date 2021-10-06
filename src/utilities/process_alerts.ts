import { UserCollection } from '../models/user';
import { Transaction } from '../models/transaction';

function processAlerts(userId: number): string {
  const friendsList: number[] = UserCollection.getFriendsForUser(userId); //here we are currently calling this function for a specifi user id, but we can parse the id from the request and use that here
  const transactionsList: Transaction[] = new Array();
  const counterMap = new Map<string, number>();
  let result: string = '';
  const intermediateCounterMap = new Map<string, number>();
  //loop through the list of friends to get their trades and store them to transactionsList
  for (let i = 0; i < friendsList.length; i++) {
    //here we are assuming that there are no duplicate transactions for single stock ticker for each user
    //if there are duplicates per user then we need to do some preprocessing on the data returned by getTradeTransactionsForUser
    //e.g. if a user is buying 5 goog, selling 3 goog and then selling 3 google => this should be represented in the transactions returned as selling 1 goog

    const tempTransactions: Transaction[] =
      UserCollection.getTradeTransactionsForUser(friendsList[i]);

    let dateSevenDaysBefore = new Date(new Date());
    dateSevenDaysBefore.setDate(dateSevenDaysBefore.getDate() - 8);
    dateSevenDaysBefore.toISOString().slice(0, 10);
    let year: number = dateSevenDaysBefore.getFullYear();
    let month: number = dateSevenDaysBefore.getMonth() + 1;
    let date: number = dateSevenDaysBefore.getUTCDate();
    //TODO filtering transactions based on the date values
    for (let j = 0; j < tempTransactions.length; j++) {
      const transactionDateValue = tempTransactions[j].time;

      const transactionYear: number = parseInt(
        transactionDateValue.substring(0, 4)
      );
      const transactionMonth: number = parseInt(
        transactionDateValue.substring(5, 7)
      );
      const transactionDate: number = parseInt(
        transactionDateValue.substring(8, 10)
      );
      if (
        year <= transactionYear &&
        month <= transactionMonth &&
        date <= transactionDate
      ) {
        transactionsList.push(tempTransactions[j]);
      }
    }
  }

  //here we need to define a function that will filter the trades that are after certain date requirement
  //transactionsList = filterTransactions(transactionsList, date);
  //OR
  //transactionsList = filterTransactionsFromLastWeek(transactionsList);

  for (let i = 0; i < transactionsList.length; i++) {
    if (!counterMap.has(transactionsList[i].ticker)) {
      if (transactionsList[i].type === 'BUY') {
        counterMap.set(transactionsList[i].ticker, 1);
      } else if (transactionsList[i].type === 'SELL') {
        counterMap.set(transactionsList[i].ticker, -1);
      }
    } else {
      if (transactionsList[i].type === 'BUY') {
        let count: any = counterMap.get(transactionsList[i].ticker);
        count++;
        counterMap.set(transactionsList[i].ticker, count as number);
      } else if (transactionsList[i].type === 'SELL') {
        let count: any = counterMap.get(transactionsList[i].ticker);
        count--;
        counterMap.set(transactionsList[i].ticker, count as number);
      }
    }
  }

  for (let entry of Array.from(counterMap.entries())) {
    let stock_buyorsell: string = '';
    let count_buyorsell: number = 0;

    if (entry[1] > 0) {
      stock_buyorsell = entry[0] + '_BUY';
      count_buyorsell = entry[1] as unknown as number;
    } else if (entry[1] < 0) {
      stock_buyorsell = entry[0] + '_SELL';
      let temp = entry[1] as unknown as number;
      count_buyorsell = Math.abs(temp);
    } else if (entry[1] == 0) {
      stock_buyorsell = entry[0] + '_NEUTRAL';
      count_buyorsell = entry[1] as unknown as number;
    }
    intermediateCounterMap.set(stock_buyorsell, count_buyorsell);
  }

  //now that we have the count of each of the tickers and their buy/sell values in a map we can sort them

  //we can display buy and sell alerts as two separate lists - this will make for a better user experience

  //sorting the map based on its values

  //reference https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
  const counterMapSorted = new Map(
    [...intermediateCounterMap.entries()].sort((a, b) => b[1] - a[1])
  );
  for (let entry of Array.from(counterMapSorted.entries())) {
    const tickerTypeArray = entry[0].split('_');
    result +=
      entry[1] + ',' + tickerTypeArray[1] + ',' + tickerTypeArray[0] + '_';
  }
  console.log(result);
  return result;
}

//function filterTransactions(transactionsList, date): Transaction[]{}

/*function filterTransactionsFromLastWeek(transactionsList): Transaction[]{
//this will get the current date and subtract 7 days from it and get the date that is a week from now and then compare 
//all the date to only keep the ones that are greater than that date
}*/

export default processAlerts;
