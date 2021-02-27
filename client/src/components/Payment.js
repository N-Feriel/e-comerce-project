import React, { useState } from 'react';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {getCartItemArray} from '../reducers/cart-reducer';

import { themeVars } from '../GlobalStyles';
import {device} from '../device';
import {getTotalPrice, getTotal} from "../helpers/pagination";


import Form from './Form';




const Payment = () => {

    const arrItem = useSelector((state) => getCartItemArray(state.cart));

    const {status} = useSelector(state => state.cart);

    const dispatch = useDispatch();








    return ( 
        <Wrapper >  
            <div style={{margin: '20px'}}>

                <div className='container'>
                    <div className='info'>
                        Items in order
                    </div>
                    {arrItem.length === 0 &&
                        <div style={{padding:'20px', textAlign:'center'}} >
                        <h4>
                            Sorry your cart is empty 
                            </h4>
                            Please Go to <Link to='/products'> Store
                            </Link> before You checkout
                        </div> 
                        

                    }

                    {arrItem.length > 0 &&
                    
                        <div style={{margin:"auto", overflowY: 'scroll'}}>
                            {arrItem.map(item => {

                                    // totalPrice = dispatch(getTotalPrice(item.quantity * item.price))'
                                    //console.log('item in the cart', item)
                                    
                                    return (

                                        <div key={item._id} 
                                            style={{display: 'flex',
                                                justifyContent:'space-around',
                                                marginTop: '10px',
                                                scrollSnapAlign: 'start'
                                        }}>
                                            <img src={item.imageSrc} alt='product img'/>
                                            <div style={{width: '50%'}}>
                                                <p style={{fontWeight:'600'}}>
                                                    {item.name}
                                                </p>
                                                <p>
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <div style={{alignSelf:'center'}}>
                                            <p>{item.price} CAD</p>
                                            </div>
                                        </div>
                                    )
                                    })
                            }
                        </div>
                    
                    }

                </div>


                <div>
                <div className= "container">
                    <div className='info'>
                        Order Summary
                    </div>

                    <div >
                        <p>
                            Subtotal : ${getTotalPrice(arrItem)}
                        </p>
                        <p>
                            Shippement: ${10}
                        </p>
                        <p>
                            Total : ${getTotal(arrItem, 10)}

                        </p>
                    </div>

                </div>

            </div>

            
            
            </div>

                <Form />

            


        </Wrapper>
    );
}


const Wrapper = styled.div`

    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;


    & .container{
        display: flex;
        height: fit-content;
        width: 500px;
        flex-direction: column;
        border: solid 1px ${themeVars.green};
        margin-top: 20px;
    }

    & .info{
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        
        background: ${themeVars.darkBlue};
        color: ${themeVars.lavender};

    }

    & img{
        width: 50px;
        height: 50px;
    }

    @media ${device.tablet} {
        flex-direction: row;

    }
`

export default Payment;