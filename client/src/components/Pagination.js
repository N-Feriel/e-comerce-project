import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";
import _ from 'lodash';

const Pagination = ({itemsCount, pageSize,currentPage, onPageChange}) => {

    const [slidePages, setSlidePages] = useState([]);

    const pagesCount = Math.ceil(itemsCount/pageSize);

    console.log('pageCount', pagesCount)
    
    const pages =_.range(1, pagesCount + 1);

    const arr = pages.slice(currentPage-3, currentPage+ 2)
    const arr2 = pages.slice(0, currentPage + 4)
    
    useEffect(() => {

        if(currentPage> 2){
            setSlidePages(arr)
        }
        else if(currentPage <= 2){
            setSlidePages(arr2)
        }
        
    }, [currentPage])

    if(pagesCount === 1) return null;


    

    return ( 
        <Nav>
            <ul>
                {currentPage > 3 && <li onClick={()=> onPageChange(1)}>1</li>}
                {currentPage > 4 && <li onClick={()=> onPageChange(currentPage -1)}>{'prev'}</li>}

                {slidePages.map(page =>(
                    
                    <li key={page} className={page === currentPage ? 'active' : ''}>
                        <a onClick={()=> onPageChange(page)}>{page}</a>
                    </li>
                ))}

                {currentPage < pagesCount - 3 && <li onClick={()=> onPageChange(currentPage + 1)}>{'next'}</li>}
                {currentPage < pagesCount - 2 && <li onClick={()=> onPageChange(pagesCount)}>{pagesCount}</li>}
            </ul>
        </Nav>
    );
}

const Nav =styled.div`
    display: flex;
    align-self: center;

    & ul{
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
        margin: 50px;
    }

    & li{
        padding: 10px;
        margin-top: 50px;
        border: 1px solid ${themeVars.darkBlue};
        width: 50px;
        font-size: 20px;
        color: ${themeVars.lavender};
        background: ${themeVars.darkBlue};
    }

    & li:hover{
        background: ${themeVars.middleRedColor};
        color: ${themeVars.darkBlue};
    }

    & .active{
        background: ${themeVars.middleRedColor};
        color: ${themeVars.darkBlue};
    }




`



export default Pagination;