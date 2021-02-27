import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useSelector, useDispatch} from "react-redux";

import {fetchProductsUpdate} from '../../helpers/fetch-helpers';
import {getCartItemArray} from '../../reducers/cart-reducer';
import { receiveProductstData,
        receiveProductsDataError, 
        clearCart
    } from '../../actions';




import { themeVars } from "../../GlobalStyles";

function FormSuccess() {


    const arrItem = useSelector((state) => getCartItemArray(state.cart));

    const dispatch = useDispatch();


    const updateDataToServer = async (arrItem)=>{

        arrItem.forEach(async(item) => {
            try{
                const response = await fetchProductsUpdate(item, item.quantity)

                console.log('reps', response)

                if(response.status == 400){
                    throw(response.message)
                    
                }else if(response.status == 200){

                    dispatch(receiveProductstData(response.data))
            
                }
            } catch(error){
                console.log(error)
                dispatch(receiveProductsDataError(error))
            }
        }
            )
    }

    useEffect(() => {
        updateDataToServer(arrItem)
        dispatch(clearCart())
    }, [])


    return (
        <Wrapper>
            <h3>
                Thank you for your purchase!!
            </h3>

            Go <Link to="/">Home</Link> to see more products
        </Wrapper>
    )
}


const Wrapper = styled.div`

    margin: auto;
    padding-top: 100px;
    color: ${themeVars.darkBlue};
    text-align: center;
    background-color:  ${themeVars.lavender};
    height: 80vh;

`



export default FormSuccess
