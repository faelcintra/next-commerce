import Stripe from "stripe";

export const stripe = new Stripe(process.env.SECRET_KEY_STRIPE, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Next Commerce",
  },
});
