import React from 'react';
import styled from "styled-components";
import { themeVars } from "../GlobalStyles";
import { useHistory } from "react-router-dom";


import {HiOutlineUser} from 'react-icons/hi';
import {MdWatch} from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Header = () => {

    const history = useHistory()

    const {cart} = useSelector((state) => state)

    let itemsInTheCart = cart ?  Object.values(cart).length : 0

    console.log(itemsInTheCart)


    const handleCart = () =>{
        history.push("/cart")
    }

    return (
        <NavBar>
            <Ul>
                <Li>Home</Li>
                <Li>Shop</Li>
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
`

const H2 = styled.h2`
    color: ${themeVars.YellowColor};
`

export default Header;