import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";
import { FaCartArrowDown } from 'react-icons/fa';
import {RiAddFill, RiSubtractFill } from 'react-icons/ri';
import Button from "../Button";
import {device} from '../device';
import { useSelector, useDispatch } from 'react-redux';

import {fetchProductsUpdate} from "../helpers/fetch-helpers";  
import {addItemToCart, 
    updateQuantity, 
    receiveProductstData,
    receiveProductsDataError} from "../actions";
import CompanyProducts from './CompanyProducts';


const ProductItemDetails = () => {

    const {productId} = useParams()
    const [item, setItem] = useState({})

    const history = useHistory();
    const {cart} =useSelector(state => state)
    const dispatch = useDispatch();

    const [status, setStatus]= useState('idle');
    const [qty, setQty]= useState(1)

    const getProductDetail = async(id) =>{
        try{
            setStatus('loading')
            const res = await fetch(`/products/${id}`);

            const json = await res.json()

            console.log('json', json)

            if(json.status == 200){
                setStatus('idle')
                setItem(json.data)
            }else{
                throw(json)
            }
        }  catch(error){
            setStatus('error')
            console.log(error)
        }
    }

    const handleBackToStore =() =>{
        history.push('/products/')
    }

    const handleFetch = (item, quantity ) =>{

        fetchProductsUpdate(item, quantity)
        .then(json =>{
            //console.log(json, 'json')
            dispatch(receiveProductstData(json.data))
        })
        .catch(error =>{
            console.log(error)
            dispatch(receiveProductsDataError(error))
        })
    }

    console.log('companyId prod', item.companyId)


    useEffect(() =>{
        getProductDetail(productId)
    }, [productId])


    if(status === 'error'){
        return ( <div>
            ...Error
        </div> )
    }
    if(status === 'loading'){
        return ( <div>
            ...Waiting for data
        </div> )
    }
    if(status === 'idle'){
        return ( <Container>

            <div style={{width:'100%', padding: '20px', display: 'flex'}}>
                <img src= {item.imageSrc} alt='img product' />
            </div>

            <div>

                <h2>
                    {item.name}
                </h2>

                <div className='details'>
                    <h4>
                        Product Details: 
                    </h4>
                    
                    <div  style={{backgroundColor: `${themeVars.middleRedColor}`,
                                padding: '10px 20px',
                                width: 'fit-content'}}>
                        {item.category}
                    </div>

                    {item.numInStock == 0 &&
                        <p>Sorry out of Stock
                            will be restock soon!
                        </p>
                    }
                    {item.numInStock > 0 &&
                    <>
                        <p>

                        <strong>{item.numInStock}</strong> items in stock
                        </p>


                    <div>
                        <h4>Quantity</h4>

                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <button  style={{color: `${themeVars.PolishedPineColor}`}} 
                                    disabled={qty > item.numInStock}
                                    onClick={()=> setQty(qty+1)}
                                >
                                < RiAddFill size='25px'/>
                            </button> 
                                
                            <button style={{padding: '10px', margin: '0 10px', fontSize: '1.2rem'}}>{qty}</button>

                            <button style={{color: `${themeVars.middleRedColor}`,fontSize:'1em'}} 
                                    disabled={qty<=0}
                                    onClick={()=> setQty(qty-1)}>
                                    <RiSubtractFill size='25px' />
                            </button> 
                        </div>

                    </div>
                    </>
                    }

                    <Button  className={item.numInStock > 0 ? "cart " : 'cart disabled'}
                            disabled={item.numInStock <= 0 || qty <= 0}
                        onClick={(ev) => {
                            if(qty > 0){
                                ev.stopPropagation()
                                if(cart[productId]){
                                    const itemToUpdate = cart[productId]
                                    dispatch(updateQuantity(itemToUpdate, 'quantity', itemToUpdate.quantity + qty ))
                                    handleFetch(itemToUpdate, qty)
    
                                } else{
                                    dispatch(addItemToCart(item, qty))
                                    handleFetch(item, qty)
                                }}
                            }}
                            >
                        Add to<FaCartArrowDown size= '25px' /> 
                    </Button>

                    <h4>
                        Only: <strong>{item.price} CAD</strong>
                    </h4>
                </div>

            </div>


            <div style={{borderTop: `solid 2px ${themeVars.green}`}}>
                <CompanyProducts companyId ={item.companyId} 
                            productId={item._id}/>
            </div>
            <div >

                <Button 
                    style={{backgroundColor: `${themeVars.darkBlue}`}}
                    onClick={(ev) => handleBackToStore()}
                    >
                    Back to store
                </Button>
                
            </div>
        </Container> )
    }
}

const Container = styled.div`

    margin: 20px;
    padding: 10px;
    border-radius: 8px;
    justify-content: center;

    & .itemDetails{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    & .details{

        display: flex;
        align-content: flex-start;
        flex-direction: column;
        overflow-x: hidden;
        border-top:  2px solid ${themeVars.darkBlue};
        border-bottom:  2px solid ${themeVars.lavender};
    }
    

    & p{ 
        /* align-self: center; */
        margin: 20px;
        color: ${themeVars.PolishedPineColor};
    }



    & img{
        width: 50%;
        margin: auto;
    }

    & strong{
        color: ${themeVars.darkBlue};
    }
    
    & h2{
        color: ${themeVars.darkBlue};
        font-size: 1.8rem;
        text-align: center;
    }

    & h4{
        
        font-size: 1.2rem;
        
    }

    & .cart{

        color: ${themeVars.lavender};
        background-color: ${themeVars.darkBlue};
        margin: 20px;
        padding: 15px;
        width: 40%;

    }

    & .cart.disabled{
        background: ${themeVars.secondGreen};
        color: ${themeVars.PolishedPineColor};

    }

    @media ${device.tablet} {
        & .itemDetails{
            flex-direction: row;

        }

        & .details{

            border-top: none;
            border-bottom:  none;
            width: 50%;

        }

        
    }

`

export default ProductItemDetails;