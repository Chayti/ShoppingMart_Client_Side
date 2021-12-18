import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAuth from '../../../hooks/useAuth';

const stripePromise = loadStripe('pk_test_51JwNMjCkzxdRkj23qr3OLpL8mH2txMbFejo5CovtCsILegRoibRsju0jBMwJSba59j9Tbr6stT94lexolj6ibVmB00lRH7Vr2e')

const Payment = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([])
    const [click, setClick] = useState(false)
    useEffect(() => {
        fetch(`https://still-gorge-06383.herokuapp.com/myOrders/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [user.email, products]);

    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const price_array = [0];

    function handleClickTrue() {
        setClick(true)
        console.log(click)
    }
    function handleClickFalse() {
        setClick(false)
        console.log(click)
    }

    return (
        <div>
            <div className="text-light">
                {products.map(product => price_array.push(parseInt(product.price)))}
            </div>
            <h4>Total Price of all of your orders: ${price_array.reduce(reducer)}</h4>
            <h6 className="pt-4">Choose Payment System:</h6>
            <button onClick={() => { handleClickFalse() }} className="btn btn-success">Cash on Delivery</button>
            <button onClick={() => { handleClickTrue() }} className="btn btn-success">Online Payment</button>
            {/* {click && price_array.reduce(reducer) > 0 && <Elements stripe={stripePromise}>
                <CheckoutForm
                    prodPrice={price_array.reduce(reducer)}
                />
            </Elements>} */}
            {click && price_array.reduce(reducer) > 0 &&
                <h4>This facility is coming soon...</h4>
            }
            {!click && price_array.reduce(reducer) > 0 &&
                <h4>Thanks! Our delivery man will contact you in time.</h4>
            }
        </div>
    );
};
export default Payment;