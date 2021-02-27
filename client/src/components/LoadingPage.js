import React from 'react';
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";
import {VscLoading} from 'react-icons/vsc'

function LoadingPage() {
    return (
        <Wrapper>
            <div>


            <VscLoading className='icon' size='80px'/>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: auto;

    & .icon{
        margin: auto;
        color:${themeVars.darkBlue};
        animation: App-img-spin 2s infinite;
    }


    @keyframes App-img-spin {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg) ;
    }
    100% {
        transform: rotate(360deg) ;
    }
    }

`

export default LoadingPage
