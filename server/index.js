'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {getProducts, getProduct, getCompanies, getCompany, updateProduct} = require("./handlers");

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

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
