const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const elements = stripe.elements();

const cardElement = elements.create('card');
cardElement.mount('#card-element');

function initializePayment() {
    return fetch ('./payments', { method: 'POST' })
    .then(res => res.text())
    .then(JSON.parse);

};

async function confirmPayment (clientSecret) {
        const result = await stripe.confirmCardPayment(clientSecret, { 
            payment_method: {
                card: cardElement,
            },
        });
        if (result.error) {
            console.error(result.error);
        } else {
            alert('Thanks for using Lanisterpay!')
        }
    }

document.getElementById('pay-button').addEventListener('click', async () => {
    const { clientSecret } = await initializePayment();
    confirmPayment(clientSecret);
});