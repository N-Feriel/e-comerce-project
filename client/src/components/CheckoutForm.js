import React , {useState, useEffect} from 'react';
import styled from 'styled-components';
import FormField from './Form/FormField';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { result } from 'lodash';


function CheckoutForm  ({ totalPrice, buyProducts }) {

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    

    const CARD_OPTIONS = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
            base: {
                color: "black",
                fontSize: "16px",
                iconColor: "black",
                "::placeholder": {
                //color: "#87bbfd"
                }
            },
            invalid: {
                iconColor: "#FFC7EE",
                color: "#FFC7EE"
            },
            complete: {
                iconColor: "#cbf4c9"
            }
        }
    }

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleServerResponse =async(response)=>{
        if (response.error) {
            // Show error from server on payment form
        } else if (response.requires_action) {
        // Use Stripe.js to handle the required card action
        const { error: errorAction, paymentIntent } =
            await stripe.handleCardAction(response.payment_intent_client_secret);
    
        if (errorAction) {
            // Show error from Stripe.js in payment form
        } else {
            // The card action has been handled
            // The PaymentIntent can be confirmed again on the server
            const serverResponse = await fetch('/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment_intent_id: paymentIntent.id })
            });
            handleServerResponse(await serverResponse.json());
        }
        } else {
        // Show success message
            
        }

    }


        const stripePaymentMethodHandler = async (result)=>{

            if (result.error) {
                setError(`Payment failed ${error.message}`);
                setProcessing(false);
            } else {
                const res = await fetch('/pay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        payment_method_id: result.paymentMethod.id,
                    }),
                })
    
                const paymentResponse = await res.json();

                handleServerResponse(paymentResponse);
    
            }
        }


        const handleSubmit = async ev => {
            ev.preventDefault();
            setProcessing(true);
        
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    // Include any additional collected billing details.
                    name: 'Jenny Rosen',
                },
                }
            });

            stripePaymentMethodHandler(result);
        
            };





    return (
        <form onSubmit={handleSubmit} style={{width: "50%", margin: 'auto'}}>

            <CardElementContainer>
                <CardElement 
                    id="card-element" 
                    options={CARD_OPTIONS} 
                    onChange={handleChange} />
            </CardElementContainer>


            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
                <span id="button-text">
                    {processing ? (
                    <div className="spinner" id="spinner"></div>
                    ) : (
                    "Pay now"
                    )}
                </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
            <div className="card-error" role="alert">
                {error}
            </div>
            )}
            {/* Show a success message upon completion */}
            



        </form>
    )
}

const SubmitButton = styled.button `
`

const CardElementContainer = styled.div`

    height: 40px;
    display: flex;
    align-items: center;
    & .StripeElement {
        width: 100%;
        padding: 15px;
    }


`

const CheckoutError = styled.div``

export default CheckoutForm
