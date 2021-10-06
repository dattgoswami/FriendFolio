# Stock Alerts

The task of this project is to build a stocks recommendation engine based on the stocks bought and sold by friends in a given week.

## Getting Started

The src folder has index.ts which creates the server and starts listening on port 3000. The routes folder has index.ts file which creates an express router and configures the alerts endpoint to use the module alerts from routes/api/alerts.ts.
The helper function is in folder file src/utilities/process_alerts.ts which has the method that is required.
All the tests(jasmine) are in the spec folder.

## Instructions

Steps to run the project:
Once you have cloned the project repo, navigate to the project directory.

```
npm install
npm run test
npm run start
//OR
node dist/index.js
```

To run the prettier and linting scripts use following commands:
npm run prettier
npm run lint

After running the npm run start or node dist/index.js you will be prompted that the server has started on port 3000.
Go to this url in the browser:
[http://localhost:3000/api/alerts] - this would display the processed alerts and list them in the browser and print it on console
[http://localhost:3000/api/] - this would show you how many endpoints are available

## Other test cases:

1. Test case for the error handling of edge cases. Calling processAlerts function with values other than the user id range should throw an error and that can be tested using a test case.
2. Endpoint can be tested for the cases when the request is unsuccessful.
3. Mock data can be added and the value returned can be tested for those.
4. If we are fetching the data from a database we can write database facing tests.

## Complexity Analysis

file src/utilities/process_alerts.ts
(line 11)As we are looping through number of friends and then looping through their transactions
The complexity is O(number of friends x number of transactions)
number of friends = F
number of transactions = T
O(F x T) which can be simplified to having a O(N^2) complexity.

(line 53)We are looping over transactions list to create a map O(total transactions)
A = total transactions = summation of (friend x each of their transaction)
the operation is of linear time O(A)

(line 73)We are looping over the counterMap and that has the size of unique tickers available in the transaction dateset O(number of tickers)
number of tickers = B => O(B)

(line 98)Sorting takes O(nlog(n)) where n is the number of entries in the map.
(line 101)Lastly, looping throught the map takes O(n) time where n is the number of entries.

Total time complexity = O(N^2 + A + B + Nlog(N) + N)
We can remove the smaller terms and consider the greatest of these
and we get

Time complexity = O(N^2)

Space complexity:
We are storing all the transactions in an array
Creating two hashmaps for the ticker and their counts
Creating a sorted map
-> O(T) + O(3B) => O(T+B)
here B = number of unique tickers
and T = number of transactions to be processed
We can generalize it to taking O(N) extra space
