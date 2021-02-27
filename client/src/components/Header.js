import React from 'react';
import styled from "styled-components";
import { themeVars } from "../GlobalStyles";
import { Link, useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';

import{GiWatch, GiHamburgerMenu} from 'react-icons/gi';

import{ FaInstagram, FaFacebookF, FaPinterest } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'

import {device} from '../device';
import AuthenticationButton from './authentication-button';
import SideBar from './SideBar';


const Header = () => {

    const history = useHistory();

    const {cart} = useSelector((state) => state)

    
    

    return (

        <NavBar>

            <Logo>
                <GiWatch size= '40px' />
                <div>
                    <h3>Co.</h3>
                    <p> <em>Watch Shop</em></p>

                </div>
            </Logo>
            

        <div>

            <button className='navOpen'>
                <GiHamburgerMenu size='30px' />
            </button>
        
            <ul className='navigation'>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <div>
                        <StyledLink to="/products">
                            Shop <FiChevronDown />
                        </StyledLink>
                        {/* <SideBar className="sideBar"
                        Categories ={Categories}
                        handleCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                /> */}

                    </div>
                    
                </li>
                <li>
                    <StyledLink to="/">
                        Contact
                    </StyledLink>
                </li>
                <li style={{display: 'flex', justifyContent: 'center'}}>
                    <FaFacebookF  size='25px' style={{margin: '5px 10px' }} className= "IconClass" />
                    <FaPinterest size='25px' style={{margin: '5px 10px'}}  className= "IconClass" />
                    <FaInstagram size='25px' style={{margin: '5px 10px'}} className= "IconClass"/>
                </li>
            </ul>
        </div>


        </NavBar>);
}

const NavBar = styled.div `
    height: 60px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: ${themeVars.darkBlue};
    color: ${themeVars.lavender};
    height: 60px;
    z-index: 20;

    & button{
        background-color: ${themeVars.darkBlue};
        padding: 10px;
        margin: 0 10px;
        border: none;
        color: ${themeVars.middleRedColor};
    }

    & li{
        padding: 20px;
        text-align: center;

    }
    & .IconClass:hover{
        color: ${themeVars.middleRedColor};

    }


    & .navigation li:last-child:hover {
            background-color: ${themeVars.darkBlue};
            color: ${themeVars.lavender};
        }

    @media ${device.mobileS} and (max-width: 768px) { 

        & .navigation {
            position: absolute;
            margin-top: 10px;
            top: 80px;
            right: 0;
            width: 100%;
            background-color: ${themeVars.darkBlue};
            display: none
        }


        & .navOpen{
            cursor: pointer;
            width: 10%;
            padding: 20px;
            margin: 20px 20px 0 auto;
        }

        & .navOpen:hover ~ .navigation,
        .navigation:hover {
            display: block;
        }

        & .navigation li:hover {
            background-color: ${themeVars.middleRedColor};
            color: ${themeVars.darkBlue};

            & a{
                color: ${themeVars.darkBlue};
            }
        }


    }

    @media ${device.tablet} {
        max-width: 100%;
        justify-content: space-between;

        & .navOpen {
            display: none;
        }
    
        & .navigation {
            display: flex;
            align-items: center;
            margin-right: 10px;


        }
        & .navigation li:hover {
            color:  ${themeVars.middleRedColor};

            & a{
                color: ${themeVars.middleRedColor};
            }
        }
    }

`

const Logo = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    border: 1px solid ${themeVars.lavender};
    margin: 15px;
    padding: 30px 0;

    font-family: 'Oswald', sans-serif;
    & h3 {
    color: ${themeVars.middleRedColor};
    font-weight: 300;
    font-size: 1.2rem;
    line-height:1;
    margin: 0;
    }
    & p{
    font-size: 1rem;
    margin: -5px 0 0 0;
    padding: 0px 10px;
    color: ${themeVars.BurlywoodColor};
    font-weight: 300;  
    text-transform: uppercase;
}
`

const StyledLink = styled(Link)`
    font-weight: bold;
    text-decoration: none;
    color: ${themeVars.lavender};
    margin: 10px;
    &:hover{
        text-decoration: none;
    }
`;


export default Header;