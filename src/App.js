import React, { useEffect } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import mockTransaction from "./mockTransaction";
import axios from "axios";
import { BALANCE_PROXY_URL } from "./config";

function App() {
  useEffect(() => {
    async function createTransaction() {
      const transaction = mockTransaction();
      window.balanceCheckout && window.balanceCheckout.destroy();
      axios({
        method: "post",
        // set the Route POST endpoint as the target URL
        url: `${BALANCE_PROXY_URL}/transactions`,
        data: transaction
      })
        .then((result) => {
          const checkoutOptions = {
            isAuth: false,
            skipSuccessPage: false,
            onClose: window.balanceCheckout.destroy,
            onCancel: () =>
              setTimeout(window.location.reload.bind(window.location), 200),
            onSuccess: () => null,
            onError: (err) => console.log(err)
          };
          window.balanceCheckout.init(checkoutOptions);
          window.balanceCheckout.render(result.data.token, "#balance-checkout");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    createTransaction();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Balance Demo Checkout</title>
        <link rel="canonical" href="http://getbalance.com" />
        <script src="https://checkout-v2.sandbox.getbalance.com/sdk.js"></script>
      </Helmet>
      <div id="balance-checkout"></div>
    </div>
  );
}

export default App;
