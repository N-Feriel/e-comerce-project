import { fromByteArray } from 'ipaddr.js';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';


const Cart = () => {

    const {cart} = useSelector((state) => state.cart)

    console.log('cart', cart)


    return ( <div>
        You have in Your Cart

    </div> );
}

export default Cart;