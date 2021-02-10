import React from 'react';
import styled from "styled-components";
import { themeVars } from "../GlobalStyles";
import { Link, useHistory } from "react-router-dom";


import {HiOutlineUser} from 'react-icons/hi';
import {MdWatch} from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Header = () => {

    const history = useHistory()

    const {cart} = useSelector((state) => state)

    let itemsInTheCart = cart ?  Object.values(cart).length : 0


    const handleCart = () =>{
        history.push("/cart")
    }

    return (
        <NavBar>
            <Ul>
                <Li>
                    <Link className="text-link" to='/'>
                        Home
                    </Link>
                </Li>
                <Li style={{position: 'relative'}}> 
                    <Link className="text-link" to='/products'>
                        Shop
                    </Link>
                    <ul className='sub_categorie'>
                        <li>categies</li>
                        <li>Body Part</li>
                    </ul>
                </Li>
            </Ul>

            <H2>Wa<MdWatch />ch</H2>

            <Ul>
                <Li> <HiOutlineUser  size= '25px'/> Login </Li>
                <Li onClick={handleCart}><AiOutlineShoppingCart size= '25px' /> {itemsInTheCart}</Li>
            </Ul>
        </NavBar>);
}

const NavBar = styled.div `
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${themeVars.darkGreen};
    height: 80px;
`

const Ul = styled.ul`
    display: flex;
    color: ${themeVars.lightColor};
    align-items: baseline;
    
`
const Li = styled.li`
    font-size: 20px;
    margin: 20px;
    align-self: baseline;


    & .text-link{
        color: ${themeVars.lightColor};
        text-decoration: none;
    }

    & .text-link:hover , .text-link:active{
        color: ${themeVars.YellowColor};
        text-decoration: none;
    
    }

    & .sub_categorie{
        display: none;
        position: absolute;
        background: ${themeVars.lightColor};
        color: ${themeVars.darkGreen};
    }

    &:hover .sub_categorie{
        display: flex;
        flex-direction: column;


        & li{
            width: 150px;
            padding: 20px;
        }

        & li:hover{
            background: ${themeVars.YellowColor};
            
        }

    }
`

const H2 = styled.h2`
    color: ${themeVars.YellowColor};
`


export default Header;