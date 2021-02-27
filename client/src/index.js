import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from "./store";
import {loadStripe} from '@stripe/stripe-js'
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
// require("dotenv").config()


const store = configureStore();


const promise = loadStripe("pk_test_51IKV6pB7B1Sagu8UVd95uCwb2LVBRNGciGg9jZFgc2QAhWTGTuIP4LhpVw0JYQRrjdNMNkdnDLSbe7vRKlFtOyJD00fKuf6dvm");


ReactDOM.render(
    
      <Provider store={store}>
        
        <Elements stripe={promise}>
          <App />  
        </Elements>
      </Provider>,
  document.getElementById('root')
);
