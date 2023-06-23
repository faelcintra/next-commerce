import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export async function resolver(req: NextApiRequest, res: NextApiResponse) {
  const priceId = "price_1NLmV3Cxwhjzou8QVEbKfYMO";
  console.log("tese");

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
