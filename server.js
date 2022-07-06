const express = require('express');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const apiRoot = '/lanisterPay';

const app = express();
app.use(express.static('public'));
app.post('/payments', async (req, res) => {
    const {client_secret} = await stripe.paymentIntents.create({
        amount: 25000,
        currency: 'ngn',
        payment_method_types: ['card'],
});
    res.send(JSON.stringify({ clientSecret : client_secret }));
});

const router = express.Router();
router.get('./payments', (req, res) => {
    res.send(JSON.stringify({ clientSecret : client_secret }));
});
app.use(apiRoot, router);
app.listen(7000, () => console.log('Application started'));