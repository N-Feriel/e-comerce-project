import React, { useState } from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import { themeVars } from "../GlobalStyles";

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
    flex-direction: column;
    background: ${themeVars.darkGreen};



    & li{
        background: ${themeVars.darkGreen};
        color: ${themeVars.lightColor};
        border-color: ${themeVars.lightColor};
        text-align: center;
        padding: 20px;
        width: 250px;
        


    }
    & li:hover{
        background: ${themeVars.lightColor};
        color: ${themeVars.darkGreen};
    }
    .active{
        background: ${themeVars.lightColor};
    color: ${themeVars.darkGreen};
    }


`

export default SideBar;