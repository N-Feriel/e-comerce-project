import React, {useEffect} from 'react';
import Profile from './Profile';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import watchImg from './watch_img.jpg'

import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";

import {device} from '../device';
import CompaniesList from './CompaniesList';
import { keyframes } from "styled-components";
import { useHistory } from 'react-router-dom';



const HomePage = () => {
    const {status, companies} = useSelector((state) => state.company);

    const history = useHistory();

    

    const handleShop = ()=>{
        history.push('/products')
    }






    if(status === 'loading'){
        return <div>
            ...Loading
        </div>
    }
    
    else if(status === 'error'){
        return <div>
            ...error
        </div>
    }

    else if(status === 'idle'){

        return (<Wrapper>

            <div className='imagContainer'>

                <div className='animateText'>

                    <h2 style={{fontSize: '2em'}}>Welcome </h2>
                    <p>We sell differents watches from differents compagnies in the world </p>
                </div>

                <button onClick={()=> handleShop()}>
                    Shop
                </button>

            </div>
    
        
        <div className= 'containerScoll'>
            <h2>List of the compagnies</h2>
            <div className='subContainer'>
                <CompaniesList />
            </div>
        
            </div>
        </Wrapper>
        )}
}


    var translate = keyframes`
        0%{
            transform: scale(1)
        }
        50%{
            transform: scale(2);
            color: ${themeVars.lavender};
            
        }

        100%{
            transform: scale(1)
            color: ${themeVars.middleRedColor};
        }
        `;

const Wrapper = styled.div`



    display: flex;
    text-align: center;
    flex-direction: column;

    & .imagContainer{
        width: 100%;
        height: 50vh;
        background-size: auto;

        position: relative;
        background-image: url(${watchImg});
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;


        & button{
            padding: 10px 20px;
            font-size: 1em;
            border-radius: 4px;
            cursor: pointer;
            margin: auto;
            background-color :  ${themeVars.lavender};
            border: solid 2px ${themeVars.darkBlue};
    
        }
    }

    & .animateText{
        z-index: 4;
        color: ${themeVars.middleRedColor};
        animation: ${translate} 4s linear;
        margin: auto;
    } 


    @media ${device.mobileS} and (max-width: 768px) { 
        justify-items: center;
        flex-direction: column;
        max-width: 700px;

        & .imagContainer{

            background-size: 700px 400px;
        }

        & .subContainer{
            display: flex;
            flex-wrap: nowrap;
            overflow-x: scroll;
        }
        & .containerScoll{
            overflow-x: hidden;
            text-align: center;
            margin: 30px;
        }
        & .prod{
            scroll-snap-align: start;
            margin: 20px;

        }

    }

    @media ${device.tablet} {

        & .containerScoll{
            display: flex;
            flex-direction: column;
            align-self: center;
            overflow: hidden;
            justify-items: space-around;
            
        } 

        & img{
            height: 70vh; 
        }
        }



        & .subContainer{
            margin: 20px;
            display: flex;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
        }

`



export default HomePage;