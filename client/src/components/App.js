import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from '../GlobalStyles';
import Company from './Company';
import Header from './Header';
import HomePage from './HomePage';
import Cart from "./Cart";
import Products from './Products';
import SideBar from './SideBar';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import {requestProductstData,
  receiveProductstData,
  receiveProductsDataError} from "../actions";


function App() {
  
  const dispactch = useDispatch();


  useEffect(() => {

      dispactch(requestProductstData())

      fetch('/products')
      .then(res => res.json())
      .then((json) => {
        dispactch(receiveProductstData(json.data))
      })
      .catch((error) =>{
        console.log('error in request', error)
        dispactch(receiveProductsDataError(error))
      })
  }, []);


  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main >
        <Route exact path="/" >
          <HomePage />
        </Route>
        <Route exact path="/products" >
          <SideBar />
          <Products />
        </Route>
        <Route exact path="/companies" >
          <SideBar />
          <Company />
        </Route>

        <Route exact path="/cart" >
          <Cart />
        </Route>
        
      </Main>
    </BrowserRouter>
  )
}

const Main = styled.div`
  display: flex;
  width: 100%;
  
  height: calc(100vh - 110px);

`;

export default App;
