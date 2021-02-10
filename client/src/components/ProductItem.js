import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


import {addItemToCart, 
    updateQuantity, 
    receiveProductstData,
    receiveProductsDataError} from "../actions";
import {fetchProductsUpdate} from "../helpers/fetch-helpers";  



import { themeVars } from "../GlobalStyles";



const ProductItem = ({item}) => {

    const {cart} =useSelector(state => state)

    let id = item._id;
    const dispatch = useDispatch();

    
    const handleFetch = (item, quantity ) =>{

        fetchProductsUpdate(item, quantity)
        .then(json =>{
            console.log(json, 'json')
            dispatch(receiveProductstData(json.data))
        })
        .catch(error =>{
            console.log(error)
            dispatch(receiveProductsDataError(error))
        })
        
    }

    
    return ( <Wrapper>
        <DivHead >
            {item.name}
        </DivHead>
        <img src={item.imageSrc} alt='imageProduct' />
        <Button  className={item.numInStock > 0 ? " " : 'disabled'}
            disabled={item.numInStock <= 0}
            onClick={() => {
                if(cart[id]){
                    const itemToUpdate = cart[id]
                    dispatch(updateQuantity(itemToUpdate, 'quantity', itemToUpdate.quantity + 1 ))
                    handleFetch(itemToUpdate, 1)

                } else{
                    dispatch(addItemToCart(item))
                    handleFetch(item, 1)
                }
            }}
        >
            Add to cart  <em style={{paddingLeft: '10px'}}> {item.price}</em>
        </Button>
        <button>
            {item.numInStock}
        </button>
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

    &.disabled{
        filter: grayscale(100%);

    }

`
export default ProductItem;