import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyles from '../GlobalStyles';
import Header from './Header';
import HomePage from './HomePage';
import Cart from "./Cart";
import Products from './Products';
import SideBar from './SideBar';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import {requestProductstData,
  receiveProductstData,
  receiveProductsDataError,
  requestCompagniestData,
  receiveCompaniesData,
  receiveCompaniesDataError} from "../actions";
import Payment from './Payment';
import ProductItemDetails from './ProductItemDetails';
import Auth0ProviderWithHistory from "../auth/auth0-provider-with-history";
import SearchBar from './SearchBar';
import Search from './Search';
import CompanyPage from "./CompanyPage";

import { themeVars } from "../GlobalStyles";
import { flatMap } from 'lodash';
import FormSuccess from './Form/FormSuccess';


function App() {

  const {search, product} = useSelector((state) => state)

  const [numInStock, setNumInStock] = useState(0);
  
  const dispatch = useDispatch();

  const getProductsData = ()=>{
    dispatch(requestProductstData())
  
    fetch('/products')
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveProductstData(json.data))
    })
    .catch((error) =>{
      console.log('error in request', error)
      dispatch(receiveProductsDataError(error))
    })
  }

  const getCompagniesData = ()=>{
    dispatch(requestCompagniestData())

    fetch('/companies')
    .then(res => res.json())
    .then((json) => dispatch(receiveCompaniesData(json.data)))
    .catch((error) =>{
        console.log('error in request', error)
        dispatch(receiveCompaniesDataError(error))
    })

  }

  useEffect(() => {
    getProductsData()
    getCompagniesData()

  }, []);



  return (
    <BrowserRouter>
    <Auth0ProviderWithHistory>

      <GlobalStyles />
      <Header />
      <SearchBar />
      {search.searchTerm &&
        <Search />
      }


      <Main >

        <div style={{width: '100%',zIndex: '1'}}>
          
          <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route exact path="/products" >
            <Products />
          </Route>
          <Route exact path="/companies" >
            <SideBar />
            <CompanyPage />
          </Route>
          <Route exact path="/payment" >
            <Payment />
          </Route>

          <Route exact path="/products/:productId" >
            <ProductItemDetails  numInStock={numInStock}  setNumInStock={setNumInStock}/>
          </Route>
          <Route exact path="/companies/:companyId" >
            <CompanyPage getProductsData={getProductsData}/>
          </Route> 
          <Route exact path="/success" >
            <FormSuccess />
          </Route> 
        </Switch>
        
        </div>
        <Cart numInStock={numInStock}  setNumInStock={setNumInStock}/>
        
      </Main>
    </Auth0ProviderWithHistory>
    </BrowserRouter>
  )
}

const Main = styled.div`
  position: absolute;
  width: 100%;
  
  
  display: flex;
  background: ${themeVars.lavender};

`;

export default App;
