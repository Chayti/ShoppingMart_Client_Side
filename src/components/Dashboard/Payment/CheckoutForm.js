import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ prodPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://still-gorge-06383.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ prodPrice })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [prodPrice]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
            setSuccess('');
        }
        else {
            setError('');
            console.log(paymentMethod);
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.name,
                        email: user.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully.')
            console.log(paymentIntent);
            setProcessing(false);
            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            // const url = `https://mighty-hollows-79626.herokuapp.com/appointments/${_id}`;
            // fetch(url, {
            //     method: 'PUT',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(payment)
            // })
            //     .then(res => res.json())
            //     .then(data => console.log(data));
        }

    }
    return (
        <div className="p-5">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {processing ? <CircularProgress></CircularProgress> : <button className="btn btn-primary" type="submit" disabled={!stripe || success}>
                    Pay ${prodPrice}
                </button>}
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;