const stripe = require('stripe')("sk_test_51MmJiXSFTtxhvKYJWSfph5QhGpDK4zBAUg2yvurc3bHztqNk8vV3c0oLozxg0p8mi5d1357nI2OYI5KKy0a3PqtJ00Ksprq6GN");
const {v4: uuidv4} = require('uuid');
uuidv4();

exports.stripePayment = (req, res) => {
    const {token, amount} = req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer=>{
        stripe.charges.create({
        amount: 100*amount,
        currency: 'INR',
        customer: customer.id,
        receipt_email: token.email
        }, {idempotencyKey}
        );
        }).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log("fass");
        })
    .catch(err => {
        console.log(err);
    }).catch(err => {
        console.log(err);
    });
}
