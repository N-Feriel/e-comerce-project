import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartArrowDown } from 'react-icons/fa';
import { useHistory } from "react-router-dom";


import {addItemToCart, 
    updateQuantity, 
    receiveProductstData,
    receiveProductsDataError} from "../actions";
import {fetchProductsUpdate} from "../helpers/fetch-helpers";  

import { themeVars } from "../GlobalStyles";
import Button from '../Button';



const ProductItem = ({item}) => {

    const {cart} =useSelector(state => state)

    const history = useHistory();

    let id = item._id;
    const dispatch = useDispatch();

    
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

    const handleItemDetail = (itemId)=>{
        history.push(`/products/${itemId}`)

    }

    
    return ( <Wrapper style={{ backgroundImage: `url(${item.imageSrc})`}}>

            <div>
                <div style={{padding: '10px 20px', 
                            color: `${themeVars.darkBlue}`,
                            background: `${themeVars.green}`,
                            margin: '10px 0 0 10px'}} 
                    className='category' >
                    {item.category}
                </div>
                <div style={{padding: '10px 20px', 
                            background: `${themeVars.darkBlue}`,
                            margin: '10px 10px 0 0'}}> 
                    {item.price}
                </div>
            </div>

            <div className='divDetails'>
                <DivHead >
                    <h4>
                        {item.name}
                    </h4>


                    {item.numInStock > 0 &&
                        <div style={{justifyContent: 'start', alignItems: 'center'}}>
                            <p>Stock</p>

                            <button style={{height: '30px', marginLeft: '20px'}}>
                                {item.numInStock}
                            </button>
                        
                        </div>
                    }

                    {item.numInStock == 0 &&
                        <div>
                            <p>Sorry out of Stock
                                will be restock soon!
                            </p>
                        </div>
                    }

                </DivHead>
                <Button style={{padding: '10px', 
                                fontSize: '0.8em', 
                                height: '50px', 
                                margin: 'auto 10px',
                                flexGrow: 1,
                }}
                    onClick={()=> handleItemDetail(item._id)}
                >
                    Product Details 
                </Button>
                
            </div>
{/* 


        <DivHead >
            {item.name}
        </DivHead>
        {/* <img src={item.imageSrc} alt='imageProduct' /> */}
        {/* <div >
            <Button  className={ item.numInStock > 0 ? "price " : 'price disabled'}
                disabled={item.numInStock <= 0}
            >
                {item.price}
            </Button>

            <Button  className={ item.numInStock > 0 ? "cart " : 'cart disabled'}
                disabled={item.numInStock <= 0}
                onClick={(ev) => {
                    ev.stopPropagation()
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
                <FaCartArrowDown 
                    size= '25px'/>
            </Button>
        </div> */}
    </Wrapper> );
}

const Wrapper = styled.div`
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: solid 2px ${themeVars.BurlywoodColor}; 
    width: 300px;
    height: 40vh;
    justify-content: space-between;
    margin : 50px 10px;
    border-radius: 10px;


    & div{
        display: flex;
        justify-content: space-between;
        color: ${themeVars.lavender}; 
        border-radius: 5px;

        
    }

    &:hover > .divDetails{
        display: flex;
    }


    & .divDetails{
        display: none;
        background: ${themeVars.lavender};

        & button{
            color: ${themeVars.lavender};
            width: fit-content;
            background: ${themeVars.darkBlue};

        }
        
    }

`

const DivHead = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    flex-grow: 3;
    text-align: start;
    

    & h4{
        color: ${themeVars.darkBlue};
        font-size: 1em;
        font-weight: 600;
    }
    & p{
        color: ${themeVars.PolishedPineColor};
    }
    
`
export default ProductItem;