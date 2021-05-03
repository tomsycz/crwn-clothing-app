import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IkYcSIUJCZFQ1hE5qv6qDU3JWr994BR29oHToEwFRlRq8Dfm6R589M4zZrJQp5D3AAPm8TtMGAJnPZBTVoM0IV600YVcLdL0o";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(response => {
        alert("Payment successful");
      })
      .catch(error => {
        console.log("PaymentError: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit cart"
        );
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
