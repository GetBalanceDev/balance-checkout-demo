Balance Checkout Demo
========


#### Hosted Balance Checkout SPA using Proxy Cloud Function ####


### What's Included ###
-  Single-page-app with [CRA](https://github.com/facebook/create-react-app) that renders the Checkout injected to head via [react-helmet](https://github.com/nfl/react-helmet), calling `POST /transactions` using [axios](https://github.com/axios/axios) with random invoice transaction populated with [faker](https://github.com/marak/Faker.js/) mock data where applicable.
-  Firebase cloud function that proxies the Balance API using rate-limited express, [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware), thereby safeguarding key in server-side environment variable.


### Usage ###
> NOTE: Invoice will be sent to buyer's email upon completing the checkout flow, use [Test Data](https://docs.getbalance.com/reference/test-data) to try out different scenarios.

**To run this demo you must first get access to the [Sandbox Dashboard](https://dashboard.sandbox.getbalance.com/settings/security) and create an API `BALANCE_KEY`.**

**To run locally, change the `axios` config in `App.js` to be:**
```
axios({
  method: 'post',
  url: 'https://api.sandbox.getbalance.com/transactions',
  headers: {'x-balance-key': 'YOUR_BALANCE_KEY'},
  data: transaction
})
```

**To deploy to Firebase cloud solutions:**

0. Pre-requisite: install [Firebase CLI](https://firebase.google.com/docs/cli), run `firebase login`
1. Create new firebase project in repo root by running `firebase init` and enabling hosting and functions
2. Install modules by running `yarn` in root and in `/function` directory
3. Run `yarn deploy --only functions` to build functions in the cloud
4. Edit the `balanceProxy` function in [GCP Console](https://console.cloud.google.com/functions) to `BALANCE_KEY` environment variable
5. Run `yarn start` to change transaction config (see `mockTransaction.js`)
6. Optional: `yarn deploy --only hosting` to build app and visit hosting URL


### Contributors ###
This project server-side is inspired by the [GCP Proxy Func](https://github.com/joshuatz/gcp-proxy-func) repo.


### License ###
Licensed under the [MIT License](./LICENSE).
