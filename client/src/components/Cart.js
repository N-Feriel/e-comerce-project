import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {getCartItemArray} from '../reducers/cart-reducer';
import {fetchProductsUpdate} from "../helpers/fetch-helpers";
import {removeItemToCart,
    updateQuantity, 
    receiveProductstData,
    receiveProductsDataError,
    clearCart} from '../actions';


import { themeVars } from "../GlobalStyles";
import Button from "../Button";
import {AiOutlineShoppingCart} from 'react-icons/ai';

const Cart = () => {

    const arrItem = useSelector((state) => getCartItemArray(state.cart));
    const dispatch = useDispatch();

    let itemInCart = arrItem.length > 0 ;
    let totalPrice = 0; 

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price)
    }

    const handleRemove = (item, quantity) =>{
        
        dispatch(removeItemToCart(item));

        fetchProductsUpdate(item, quantity)
        .then(json =>{
            console.log(json, 'json')
            dispatch(receiveProductstData(json.data))
        } )
        .catch(error =>{
            console.log(error)
            dispatch(receiveProductsDataError(error))
        })
    }

    const handleUpdate = (item, qty) =>{

        if(item.quantity + qty >= 0){

            dispatch(updateQuantity(item, 'quantity', item.quantity + qty))

            fetchProductsUpdate(item, qty)
            .then(json =>{
                console.log(json, 'json')
                dispatch(receiveProductstData(json.data))
            } )
            .catch(error =>{
                console.log(error)
                dispatch(receiveProductsDataError(error))
            })
        }
        console.log(item, 'item update')
    }

    const handleClearCart = () =>{

        alert('Are you sure to clear your cart??')
        const itemsClear = [...arrItem]
        dispatch(clearCart(itemsClear))
        arrItem.forEach(item => {
            fetchProductsUpdate(item, -item.quantity)
            .then(json =>{
                //console.log(json, 'json')
                dispatch(receiveProductstData(json.data))
            } )
            .catch(error =>{
                console.log(error)
                dispatch(receiveProductsDataError(error))
            })
        })
    }


    return(

        <Wrapper>
            {!itemInCart && 
            <div style={{display: "flex", flexDirection: 'column'}}>
            <h2>
                You don't have any item in you Cart Please Go to 
            </h2>
            <p>
                <Link to='/products'> to select products </Link>
            </p>
            </div>
    
            }

        {itemInCart &&
    
            <div>
                <h2>
                    You have <em>{arrItem.length} items</em> in your cart
                </h2>

                <Table>
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {arrItem.map(item => {

                            {totalPrice += (item.price.substring(1)) * (item.quantity || 0)}
                            return (<tr className='rowProduct' key={item._id} >
                                <td><img src={item.imageSrc} /></td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button  disabled={item.quantity <=0}
                                        onClick={(ev)=> handleUpdate(item, -1)}>-</button> 
                                    <button>{item.quantity}</button>

                                    <button onClick={(ev)=> handleUpdate(item, +1)}>+</button> 
                                
                                </td>
                                <td>
                                    <Button onClick ={() =>handleRemove(item, -item.quantity)}>remove</Button>
                                </td>
                            </tr>
                            )}
                        )}

                    </tbody>

                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> Total</td>
                            <td> {formattedPrice(totalPrice)}</td>
                        </tr>
                    </tfoot>

                </Table>   

                <DivFooter>
                    <Button style={{backgroundColor: `${themeVars.YellowColor}`}}
                            onClick={handleClearCart}
                        >
                        Clear <AiOutlineShoppingCart/>
                    </Button>
                    
                    <Button style={{backgroundColor: `${themeVars.lightBlack}`}}
                        onClick={handlePay}
                    
                        >
                        PAY
                    </Button>
                </DivFooter>
            </div>
        }

        </Wrapper>
        
        
    )
    
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background: ${themeVars.lightGreen};
    text-align: center;

    & h2{
        margin: 150px 50px 50px 50px;
    }

`

const Table = styled.table`

    width: 100%;
    border-collapse: collapse;
    margin: 40px;
    table-layout: auto;


    & img{
        width: 50px;
    }
    & button{
        font-size: 16px;
        border-radius: 4px;
        background-color: ${themeVars.YellowColor};
        border: none;
    }

    & th{
        padding: 10px;
        margin: 0 10px;
        text-align: center;
        color: ${themeVars.darkGreen};
        border-bottom: 1px solid ${themeVars.darkGreen};

    }


    & td {
        padding: 10px;
        margin: 0 10px;
        text-align: center;
        border-bottom: 1px solid ${themeVars.darkGreen};

        & button{
            margin-right: 8px;
            color: ${themeVars.darkGreen};
            padding: 4px;
        }
    }

    & tr:hover{
        background: ${themeVars.darkGreen};
        color: ${themeVars.lightColor};
        border-color: ${themeVars.lightColor};
    
    }

    & input{
        width: 40px;
        height: 35px;
        background: ${themeVars.lightColor};
        font-size: 18px;

    }

`

const DivFooter = styled.div`

    display: flex;
    justify-content: space-around;

    & button{
        width: 150px;
    }

`

export default Cart;