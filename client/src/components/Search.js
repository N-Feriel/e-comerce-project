import React,  { useEffect }  from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {requestReseachtData, receiveResultsData, receiveResultsDataError} from "../actions";
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";



const Search = () => {

    const dispatch = useDispatch();
    const {search, product} = useSelector((state) => state)

    useEffect(() =>{

        requestReseachtData()
        
        if(product.products){
            dispatch(receiveResultsData(product.products.filter(item => (
                item.name.toLowerCase().includes(search.searchTerm.toLowerCase())
                ||
                item.category.toLowerCase().includes(search.searchTerm.toLowerCase())
                || 
                item.body_location.toLowerCase().includes(search.searchTerm.toLowerCase())        
            ))))
        }else{
            dispatch(receiveResultsDataError('something wrong happend !!!'))
        }
    }, [search.searchTerm])


    if(search.status === 'loading'){
        return <div>
            ...Loading
        </div>
    }
    
    else if(search.status === 'error'){
        return <div>
            {/* ...error in search */}
        </div>
    }
    
    else if(search.status === 'idle'){
        return (
            <Div className='container'>
                {search.results.length > 0 && 
                <ul>
                    <h4>
                        We found <strong>{search.results.length}</strong> for <em>"{search.searchTerm}"</em> 
            
                    </h4>

                    {search.results.map(result => {
                        return <li key={result._id}>
                            <img src={result.imageSrc} alt='imag result' />
                            <Link className="text-link" to={`/products/${result._id}`}>
                                {result.name}
                            </Link>
                        </li>
                    })}
                </ul>
                }

                {search.results.length === 0 && 
                <h4>
                    Sorry no result for "<strong>{search.searchTerm}</strong> "
                </h4>
                }
            </Div>

        )
        }


    
}

const Div = styled.div`

    margin-top: 50px;
    display: flex;
    background: ${themeVars.lavender};
    height: fit-content;

    & h4{
        color: ${themeVars.darkBlue};
        text-align: center;
    }

    & li{
        margin: 20px;
        padding: 10px;
        border-radius: 10px;
        border: solid 2px ${themeVars.middleRedColor};
        align-items: center;
        display: flex;
    }

    & img{
        width: 100px;
        height: 100px;
        margin-right: 20px;
        border-radius: 50%;

    }

    & .text-link{
        color: ${themeVars.darkBlue};
        text-decoration: none;
    }

    & .text-link:hover , .text-link:active{
        color: ${themeVars.PolishedPineColor};
        text-decoration: none;
    }

`


export default Search;