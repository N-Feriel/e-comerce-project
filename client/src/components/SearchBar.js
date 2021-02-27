import React, {useEffect} from 'react';
import {requestReseachtData} from "../actions";
import {useSelector, useDispatch} from 'react-redux';

import styled, { css } from "styled-components";
import { themeVars } from "../GlobalStyles";
import {BiSearchAlt2} from 'react-icons/bi';
import { useHistory, Link } from 'react-router-dom';
import { FaPortrait } from 'react-icons/fa';

function SearchBar() {

    const dispatch = useDispatch();
    const {search, product} = useSelector((state) => state);

    const history = useHistory();

    let firstHalf, secondHalf;

    const suggestions =[product.products];
    const[isEscape, setEscape] =React.useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(0);

    let BodyLocationCategorie = [];
    let Categories =[];

    

    const groupedSuggestions = [];


    const getSuggestions = (products) =>{
        if(!products){
            return []
        }else {

            products.map(item =>{
    
                BodyLocationCategorie = [...new Set([...BodyLocationCategorie, item.body_location])]
                Categories = [...new Set([...Categories, item.category])]
            })

            return products.filter(suggestion =>{
                let containValue = suggestion.name.toLowerCase().includes(search.searchTerm.toLowerCase())  
                if(search.searchTerm.length >=2 && containValue){
                    return (suggestion.name)
                }   

            })
        }

    }

    const handleSelectSuggestion = (productId) =>{
        history.push(`/products/${productId}`)
        dispatch(requestReseachtData(''))

    }



    const matchedSuggestions = getSuggestions (product.products);

    // console.log('grouped', groupedSuggestions, 'match', matchedSuggestions)

    Categories.map(value => {
        let result = matchedSuggestions.filter(suggestion => (suggestion.category ===value))
        groupedSuggestions.push({'categoryName': value, suggestions: result})
    })

    const handleKeyDown =(ev)=>{
        switch(ev.key){
            case 'Enter':{
                dispatch(requestReseachtData(ev.target.value));
                return
            }
            case 'ArrowUp':{
                if(selectedSuggestionIndex >= 1){
                    console.log('Up');
                    setSelectedSuggestionIndex(selectedSuggestionIndex -1);
                    return;
                }
            }
            case 'ArrowDown':{
                console.log('dwn', selectedSuggestionIndex);
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                return;
            }

            case 'Escape':{
                setEscape(true);
                return;
            }

            default :{
                setEscape(false);
                return;
            }


        }

    }

    return (
        <div style={{background: `${themeVars.darkBlue}`, padding:'30px 0 30px 0'}}>
            <Container>
            <input 
                id='search'
                type="text"
                onChange={(ev) => dispatch(requestReseachtData(ev.target.value))}
                value={search.searchTerm}
                onKeyDown={(ev)=> handleKeyDown(ev)}
            />
            <BiSearchAlt2  size="25px"/>


            </Container>
        

        {matchedSuggestions.length > 0 && 
            <Ul>{groupedSuggestions.map((groupedSuggestion) =>{
                return(

                    groupedSuggestion.suggestions.length> 0 &&
                    <li key={groupedSuggestion.categoryName}>
                        <span className='title'>In {groupedSuggestion.categoryName} :</span>
                        <ul>
                        
                            
                            {groupedSuggestion.suggestions.map((suggestion, i) =>{

                                let indexOfValue = suggestion.name.toLowerCase().indexOf(search.searchTerm);

                                firstHalf = suggestion.name.slice(0, indexOfValue + search.searchTerm.length);
                                secondHalf = suggestion.name.slice(indexOfValue + search.searchTerm.length);

                                return(
                                    <Suggestion 

                                    key={suggestion._id}
                                    onClick={()=> handleSelectSuggestion(suggestion._id)}
            
                                    className= {isEscape ? "expended-area" : null }

                                    onMouseOver={() => {
                                        setSelectedSuggestionIndex(i)
                                    }}
                                    onKeyDown={(ev)=> handleKeyDown(ev)}

                                    selected= {selectedSuggestionIndex === i}
                
                                >

                        
                                        <span>
                                            {firstHalf}
                                            <span>
                                                <strong>{secondHalf}</strong>
                                            </span>
                                                <em> In </em>
                                            <span style={{color: 'purple', fontStyle: 'italic'}}>
                                                {suggestion.category}
                                        

                                            </span>
                                        </span>

                                    </Suggestion> 
                                )
                            })}

                        </ul>

                    </li>
                )
                
            })}</Ul>
        }
    
    </div>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto ;
    color: ${themeVars.lavender};
    background: ${themeVars.darkBlue};
    border: solid 2px ${themeVars.lavender};
    width: 50% ;
    border-radius: 10px;

    & input{
        border-radius: 8px;
        padding: 10px;
        color: ${themeVars.darkBlue};
        font-size: 1.2rem;
        border: none;
        width: 95%;
        outline: none;
    }


`
const Ul = styled.ul`
    background-color: ${themeVars.lavender};
    width: 70%;
    margin: 0 auto;

    & .title{
        display: block;
        color: ${themeVars.middleRedColor};
        padding: 20px;
        margin: 20px
    }

`

const Suggestion = styled.li`
    padding: 20px;
    margin: 10px;
    cursor: pointer;

    .expended-area{
        display: none;
    }

    &.spaceIn{
        padding-left: 2px;
        padding-right: 2px;
    }

    ${props=> props.selected && css`
        background-color: hsl(180, 50%, 50%);
        color: hsl(0, 50%, 80%);
    `}
    /* &:hover{

        background-color: hsl(180, 50%, 50%);
        color: hsl(0, 50%, 80%);

    } */


`

export default SearchBar
