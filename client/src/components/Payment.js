import React from 'react';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {useSelector} from "react-redux";
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm';
import StripeCheckout from "react-stripe-checkout";
// import { CardElement, useStripe, useElements, ElementsConsumer } from "@stripe/react-stripe-js";


const Payment = () => {


    const promise = loadStripe("pk_test_51IKV6pB7B1Sagu8UVd95uCwb2LVBRNGciGg9jZFgc2QAhWTGTuIP4LhpVw0JYQRrjdNMNkdnDLSbe7vRKlFtOyJD00fKuf6dvm");


    return ( 
        <div>   
        <Elements stripe={promise}>
            <CheckoutForm />
        </Elements>
    { /* 
            <StripeCheckout
                token={makePayment}
                stripeKey={process.env.REACT_APP_PUB_KEY}
                name="Buy watch Shop product"
                amout={product.price * 100}
                >
                    <button>Buy {product.price}</button>

                {/* <CheckoutForm /> */}
            {/* </StripeCheckout> */}



        </div>
    );
}

export default Payment;