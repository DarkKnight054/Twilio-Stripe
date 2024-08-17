require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const storedItems = new Map([
  [1, { priceInCents: 100, name: "Mastering Docker" }],
  [2, { priceInCents: 200, name: "Mastering Frontend" }],
]);
const makePayment = async function (req, res) {
  try {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storedItem = storedItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storedItem.name,
            },
            unit_amount: storedItem.priceInCents,
          },
          quantity: item.amount,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { makePayment };
