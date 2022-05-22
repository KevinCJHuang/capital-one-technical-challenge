# Capital One Technical Assessment - Intern Fall 2022

## Introduction
This web app is created for Capital One's Fall 2022 Intern Technical Assessment. I implemented the solution to the assessment as a typical MERN web application (MongoDB, Express, React, Node). The Express backend provides APIs for CRUD operations of a transaction record in the Mongo Database, and an API to calculate reward points based on a set of transaction records. I also included a simple React/Bootstrap frontend.

The web app is deployed [**here**](https://reward-point-system-chengjie.herokuapp.com/) at Heroku.

If you are only interested in the  **reward calculation algorithm**, please feel free to navigate to `routes/report.js`.

## How to use
1. Go to [Heroku](https://reward-point-system-chengjie.herokuapp.com/) deployment.
1. Navigate to the `Home` page of the app.
2. Add transaction records in the `Add New Transaction Record` section with a pair of `Merchant Code` and `Amount in Cents` inputs.
3. Click the `Generate Report` button to generate a report for both the total monthly reward and a per transaction reward.
4. After you have added/deleted a transaction record, please click the `Generate Report` button again to refresh.

## Install and Run
If you want to run this locally (and not use the deployment on Heroku), first clone the repository. Then, `cd` into the repo, and run the following commands.
```
npm i
npm run clientinstall
npm run dev
```
The `npm run dev` command will run both the frontend and the backend concurrently. The React web app will be launched at its default `3000` port at `localhost`, and the Express backend will be at port `5001`.

## Project Structure
Backend:
- `server.js` - the main driver of the backend. It initializes Express, connects to the MongoDB, and creates all the routes.
- `config/` - contains configuration constants including the mongoDB URI and the secret key for jwt.
- `models/` - contains the schemas for the MongoDB. Only one data schemas is used, which is located in `models/Transaction.js`. This is the data schema for transaction record.
- `routes/` - contains the API routes for `Transaction` and `Report`.
  - `routes/transaction.js` contains the APIs for the `Transaction` data schema. It includes the basic `CRUD` operations.
  - `routes/report.js` contains a `POST` API that takes a set of transaction records from `req.body`, calculates the max reward points for total monthly reward and per transaction rewards with an algorithm, and sends the results back. In other words, **this is the main body of the reward calculation "algorithm" itself.**

Frontend:
- `client/` - contains everything of the React frontend with Bootstrap. I'll omit the details of the frontend in this document since the backend APIs are the focus of this repository.

## Backend APIs
There are two sets of APIs.
### Transaction
- `GET /api/transaction` - fetches all the transaction records in the MongoDB.
- `POST /api/transaction` - creates an `Transaction` record in the database according to `req.body`. Fields in `res.body` are validated by an `express-validator` with corresponding patterns to ensure that input from the request is valid.
- `PUT /api/transaction/:id` - updates an `Transaction` item according to `req.body`. The item could be partially updated, meaning `req.body` does not have to be a full `Transaction` object.
- `DELETE /api/transaction/:id` - deletes an `Transaction` item with `:id`.
### Report
- `POST /api/report` - parses the transaction records input in `req.body`, and sends a respond with all the reward points results.

