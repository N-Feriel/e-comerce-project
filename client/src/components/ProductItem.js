import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {addItemToCart, updateQuantity} from "../actions";
import { themeVars } from "../GlobalStyles";



const ProductItem = ({item}) => {

    const {cart} =useSelector(state => state)

    let id = item._id

    

    
    const dispatch = useDispatch();
    
    return ( <Wrapper>
        <DivHead >
            {item.name}
        </DivHead>
        <img src={item.imageSrc} alt='imageProduct' />
        <Button onClick={() => {
            if(cart[id]){
                //console.log('stateid', id)
                const itemToUpdate = {...cart[id]}
                dispatch(updateQuantity(itemToUpdate, 'quantity', itemToUpdate.quantity + 1 ))
            } else{
                dispatch(addItemToCart(item))}
            }
        }
        >
            Add to cart  <em style={{paddingLeft: '10px'}}> {item.price}</em>
        </Button>
    </Wrapper> );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 2px ${themeVars.lightColor}; 
    align-items: center;
    justify-content: space-between;
    width: 20%;
    margin : 50px 10px;
    border-radius: 10px;


& img{
    width: 200px;
    padding: 20px;
}
`

const DivHead = styled.div`
    color: ${themeVars.lightColor};
    text-align: center;
    padding: 20px;
    font-weight: bold;
    width: 100%;
    background:${themeVars.lightBlue};
    -webkit-border-top-left-radius: 9px;
    -webkit-border-top-right-radius: 9px;
    -moz-border-radius-topleft: 9px;
    -moz-border-radius-topright: 9px;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
`

const Button = styled.button `
    color: ${themeVars.YellowColor};
    border: none;
    font-size: 24px;
    padding: 10px 20px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    background: ${themeVars.lightGreen};
    -webkit-border-bottom-right-radius: 9px;
    -webkit-border-bottom-left-radius: 9px;
    -moz-border-radius-bottomright: 9px;
    -moz-border-radius-bottomleft: 9px;
    border-bottom-right-radius: 9px;
    border-bottom-left-radius: 9px;

`
export default ProductItem;