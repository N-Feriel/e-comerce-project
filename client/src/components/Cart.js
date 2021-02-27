import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {getCartItemArray} from '../reducers/cart-reducer';
import {fetchProductsUpdate, fetchGetProduct} from "../helpers/fetch-helpers";
import {removeItemToCart,
    updateQuantity, 
    receiveProductstData,
    updteProductData,
    receiveProductsDataError,
    clearCart} from '../actions';

import {getTotalPrice} from "../helpers/pagination";


import { themeVars } from "../GlobalStyles";

import {RiAddFill, RiSubtractFill } from 'react-icons/ri';
import Button from "../Button";
import {AiOutlineShoppingCart, AiOutlineClose} from 'react-icons/ai';
import {GrCart, GrFormClose} from 'react-icons/gr';
import {ImSad} from 'react-icons/im';
import{GiWatch} from 'react-icons/gi';


import CheckoutForm from './CheckoutForm';

const Cart = ({numInStock, setNumInStock}) => {

    const[isPayment ,setIsPayment] = useState(false);
    const [showCart, setShowCart] = useState(false);

    
    const arrItem = useSelector((state) => getCartItemArray(state.cart));
    const dispatch = useDispatch();
    
    let itemInCart = arrItem.length > 0 ; 
    
    const history = useHistory()


    const formattedPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price)
    }

    const handleShowCart = ()=>{
        setShowCart(!showCart)
    }

    const handleRemove = (item) =>{
        console.log('item remove', item)
        dispatch(removeItemToCart(item));
        setNumInStock(numInStock + item.quantity)
    }
    
    
    
    const handleUpdate = (item, qty) =>{
            if(item.numInStock >= qty){
                console.log('update', qty, item)
                dispatch(updateQuantity(item, 'quantity', qty))
                setNumInStock(numInStock - qty)
                
            }else {
                dispatch(receiveProductsDataError("We don't have enough on the stock"))
            }
            
    }



    const handleClearCart = () =>{

        alert('Are you sure to clear your cart??')
        const itemsClear = [...arrItem]
        dispatch(clearCart(itemsClear))
        setShowCart(!showCart)
        history.push('/products')

    }

    const checkDataStock = async (arrItem)=>{

        if(arrItem.length> 0){
            arrItem.forEach(async(item) => {
                try{
                    const response = await fetchGetProduct(item)

                    console.log('repsUpdate', response)
    
                    if(response.status == 400){
                        throw(response.message)
                        
                    }else if(response.status == 200){

                        if(response.data.numInStock >= item.quantity){
                            setIsPayment(true)
                            history.push('/payment')
                        }else{
                            throw('sorry You wait too long to buy this item')
                        }
                
                    }
                } catch(error){
                    console.log(error)
                    dispatch(receiveProductsDataError(error))
                }
            }
                )
                
            }

    }

    

    const handlePay = ()=>{
        setShowCart(!showCart)
        checkDataStock(arrItem)
    }

    const handleShop = ()=>{
        setShowCart(!showCart)
        history.push('/products')
    }

    useEffect(() => {
        getTotalPrice(arrItem)

    }, [arrItem])

    

    let totalPrice = getTotalPrice(arrItem);
    //console.log('total', totalPrice)


    return(

        <Wrapper>

            {!showCart && 
            
                <DivCart onClick={() => handleShowCart()}>
                        <div>
                            {arrItem.length > 0 &&
                                <span style={{background: `${themeVars.darkBlue}`, 
                                            color: `${themeVars.lavender}`,
                                            padding: '4px',
                                            borderRadius: '50%'}}>
                                    {arrItem.length}
                                </span>
                            }
                            <GrCart/>  cart
                        </div>
                        <div style={{backgroundColor:`${themeVars.BurlywoodColor}`}}>
                            subtotal: ${totalPrice}
                        </div>
                </DivCart>
            }

            {showCart &&
                <ContainCart>

                    <DivHeaer>

                        <GiWatch size= '40px' />
                        < AiOutlineClose  size= '20px' 
                                onClick={()=> handleShowCart()}
                        
                        />

                    </DivHeaer>

                    {!itemInCart &&
                        <SubDiv style={{ justifyContent: 'center',
                            alignItems: 'center'}} >
                            <ImSad size='30px' />
                            <h4>
                                Oh noes, your cart is empty friend. Better do something about that! 

                            </h4>

                            <Button style={{marginTop: '40px'}}
                                onClick={()=> handleShop()}>
                                Shop Now
                            </Button>

                        </SubDiv>

                    }

                    {itemInCart && 
                
                        <SubDiv style={{ flexWrap: 'nowrap',
                            overflowY: 'scroll'}}>
                            <div style={{display:'flex',alignItems:'center', justifyContent:'space-between',
                            borderBottom: `solid 1px ${themeVars.green}`,
                        
                        }}>
                                <Button style={{background:`${themeVars.middleRedColor}`}}
                                    onClick={handleClearCart}>
                                        Clear
                                </Button>
                                <div style={{flexGrow:'3'}}>
                                    <h2>
                                        Shopping Cart
                                    </h2>
                                    <p>
                                        Process to checkout as soon you're ready.
                                    </p>

                                </div>

                            </div>

                            <div style={{margin:"auto", overflowY: 'scroll'}}>
                            {arrItem.map(item => {

                                    // totalPrice = dispatch(getTotalPrice(item.quantity * item.price))'
                                    // console.log('item in the cart', item)
                                    
                                    return (

                                        <div key={item._id} 
                                            style={{display: 'flex',
                                                justifyContent:'space-between',
                                                marginTop: '10px',
                                                alignItems: 'center',
                                                scrollSnapAlign: 'start'
                                        }}>
                                            <img src={item.imageSrc} alt='product img'/>
                                            <div style={{width: '50%'}}>
                                                <h5 style={{marginTop: 0}}
                                                >{item.name}</h5>
                                                <p style={{margin: '20px 10px', textAlign:'initial'}}>{item.price} CAD</p>
                                                
                                            </div>

                                            <div style={{display: 'flex', 
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        }}>
                                                    
                
                                                <button  style={{color: `${themeVars.PolishedPineColor}`}} 
                                                        disabled={item.numInStock <= item.quantity }
                                                        onClick={(ev)=> handleUpdate(item, +1)}
                                                    >
                                                    < RiAddFill />
                                                </button> 
                                                <button>{item.quantity}</button>
                                                <button style={{color: `${themeVars.middleRedColor}`,fontSize:'1em'}} 
                                                        disabled={item.quantity === 0}
                                                        onClick={(ev)=> handleUpdate(item, -1)}        
                                                        > 
                                                        <RiSubtractFill />
                                                </button> 
                                            </div>
                                            <div> 
                                            <Button style={{background: 'gray', fontSize: '0.8em', margin: 'auto 15px' }} 
                                                    onClick ={() =>handleRemove(item)}>
                                                    remove
                                                </Button>
                                            </div>


                                        </div>
                                    )
                                    })
                            }

                            </div>

                            <div>
                                
                                <div style={{padding: '20px', borderTop: 'solid 1px gray'}}>
                                    subtotal : 
                                    <em style={{marginRight: 0}}> {formattedPrice(totalPrice)}
                                        </em>
                                </div>
                                <Button  style={{width:'100%', borderRadius: 0, background: 'black'}}
                                    onClick={handlePay} >
                                    Pay
                                </Button>
                                <Button onClick={handleShop}
                                    style={{width:'100%', borderRadius: 0, margin: '10px 0'}}>
                                    Continue To Shop
                                </Button>
                            </div>

                        </SubDiv>
                    }
                </ContainCart>

            }

        {/* {isPayment &&
            <CheckoutForm totalPrice={totalPrice} buyProducts={arrItem} />

        } */}

        </Wrapper>
        
        
    )
    
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color:  ${themeVars.lavender};
    max-width: 80vw;
    position: fixed;
    z-index: 30;
    top: 166px;
    right: 0;
`

const DivCart = styled.div`
    background-color:  ${themeVars.lavender};
    position: relative;
    & div{
        font-size: 1em;
        padding: 15px 20px;
    }
    `

const DivHeaer = styled.div`
    background-color: ${themeVars.BurlywoodColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;


`

const SubDiv = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    padding: 20px;

    & button{
        
        width: fit-content;
        background-color: ${themeVars.darkBlue};
        color: ${themeVars.lavender};
    }

    & img{
        width: 100px;
        height: fit-content;
        margin-left: 10px;
    }
`



const ContainCart = styled.div`
    text-align: center;
    align-self: center;
    margin: auto;

`




export default Cart;