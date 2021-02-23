'use strict';

const express = require('express');
require("dotenv").config()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require("cors");

const keyPublishable = process.env.PUB_KEY;

const {getProducts,
        getProduct, 
        getCompanies, 
        getCompany, 
        updateProduct, 
        createPayment,
      } = require("./handlers");


const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))

  .use(cors())
  // .set("view engine", "pug");

  .use(express.static('./server/assets'))

  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))

  //get all products from DataBase

  .get('/products', getProducts)
  .get('/products/:productId', getProduct)
  .get('/companies', getCompanies)
  .get('/companies/:companyId', getCompany)
  .patch('/products/:productId', updateProduct)
  


  //Create Express routes
  // .get("/secret", async (req, res) =>
    
  // res.json("index.pug", {client_secret: intent.client_secret}))

  .post("/pay", createPayment)

  .get('/secret', async (req, res) => {
    const intent = // ... Fetch or create the PaymentIntent
    res.json({client_secret: intent.client_secret});
  })


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
