import React from 'react';
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";
import _ from 'lodash';

const Pagination = ({itemsCount, pageSize,currentPage, onPageChange}) => {


    const pagesCount = Math.ceil(itemsCount/pageSize);

    if(pagesCount === 1) return null;

    const pages =_.range(1, pagesCount + 1);

    return ( 
        <Nav>
            <ul>
                {pages.map(page =>(
                    <li key={page} className={page === currentPage ? 'active' : ''}>
                        <a onClick={()=> onPageChange(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </Nav>
    );
}

const Nav =styled.div`
    display: flex;

    & ul{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 50px;
    
    }

    & li{
        padding: 10px;
        margin-top: 50px;
        border: 1px solid ${themeVars.lightGreen};
        width: 50px;
        font-size: 20px;
        color: ${themeVars.darkGreen};
        background: ${themeVars.lightGreen};
    }

    & li:hover{
        background: ${themeVars.YellowColor};
        color: ${themeVars.lightColor};
    }

    & .active{
        background: ${themeVars.YellowColor};
        color: ${themeVars.lightColor};
    }




`



export default Pagination;