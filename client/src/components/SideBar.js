import React, { useState } from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import { themeVars } from "../GlobalStyles";

import { MdSubject } from 'react-icons/md';
import {device} from '../device';

const SideBar = ({Categories, handleCategorySelect, selectedCategory}) => {

    const {status, products} = useSelector((state) => state.product)

    //console.log('cat',products)

    const allCategories = ['All Categories', ...Categories]


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


        return(
            <Wrapper>

                {/* <h4>All products</h4> */}
                {/* <h4>Body Location</h4>
                <ul className='sub-category'>
                    {BodyLocationCategorie.map(location =>(
                        <li>{location}</li>
                    ))}

                </ul> */}

                <MdSubject size='40px' className='IconClass'/>

                <ul className='sub-category'>
                    {allCategories.map(category =>(
                        <li key={category} 
                            className={category === selectedCategory ? 'active' : ""}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </li>
                    )
                    )}

                </ul>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    margin-right: auto;

    & ul{
        display: flex;
    }


    & li{
        background: ${themeVars.green};
        color: ${themeVars.darkBlue};
        border-radius: 4px;
        border: ${themeVars.darkBlue} 2px solid;
        text-align: center;
        padding: 10px 20px;
        margin: 5px;;

    }
    & li:hover{
        background: ${themeVars.darkBlue};
        color: ${themeVars.lavender};
    }
    .active{
        background: ${themeVars.darkBlue};
        color: ${themeVars.lavender};
    }


    @media ${device.mobileS} and (max-width: 768px) { 

        & .IconClass:hover ~.sub-category,
        .sub-category:hover{
            display: block;
        }

        & .sub-category{
            display: none;
        }

        & .IconClass:hover{
            color: ${themeVars.middleRedColor}
        }

    }

    @media ${device.tablet} {
        & .IconClass{
            display: none;
        }
    
    }

`

export default SideBar;