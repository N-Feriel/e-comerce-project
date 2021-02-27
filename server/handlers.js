
const { padEnd } = require("lodash");
const { token } = require("morgan");
const companies = require("./data/companies.json");
const items = require("./data/items")
require("dotenv").config()



const getProducts = (req, res) =>{

    res.status(200).json({
        status: 200,
        data: items,
        message: "success"
    })
}

const getProduct = (req, res) =>{

    let idProduct = req.params.productId

    let productName = items.find(item => item._id == idProduct)

    if(!productName){
        res.status(404).json({
            status: 404,
            message: "Product with given ID not found"
        })
    }else{

        res.status(200).json({
            status: 200,
            data: productName
        })
    }

}

const getCompanies = (req, res) =>{
    res.status(200).json({
        status: 200,
        data: companies,
        message: "success"
    })
}


const  getCompany = (req, res)=>{

    let idCompany = req.params.companyId

    const companyName = companies.find(company => company._id == idCompany)

    if(!companyName){

        res.status(404).json({
            status: 404,
            message: "Company with given ID not found"
        })
    }else{

        res.status(200).json({
            status: 200,
            data: companyName
        })
    }

}

const updateProduct = (req, res) => {

    const idProduct = req.params.productId;

    let productName = items.find(item => item._id == idProduct)

    if(!productName){
        res.status(404).json({
            status: 404,
            message: "can't update the product with given ID "
        })
    }else{
        if(req.body.quantity > productName.numInStock){
            res.status(400).json({
                status: 400,
                message: "Sorry we are out of stock"
            })

        } else {

            const productIndex = items.findIndex((obj => obj._id == idProduct))

            items[productIndex].numInStock = items[productIndex].numInStock - req.body.quantity



            res.status(200).json({
                status: 200,
                data: productName
                    
            })
        }
        
    
    }
}

//Add part Stripe payment part

const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")("sk_test_51IKV6pB7B1Sagu8UqM2FexpgXhGjtdQOFvjgyAwLkFL2iSyrPHH5fWR2uFsyoIMmZ4YRgSOxQwOTk0BufSCN7Wd200S9SJygyp");


const calculateOrderAmount = items => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
        return 1400;
    };

const createPayment = async(req, res) => {

    // const uuid  = require('uuid/v4')
    // const idempontencyKey = uuid();

    console.log('req.bod', req.body)
    try{
        const {amount} = req.body;
        console.log('req', req.body)

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "cad",
            payment_method_types: ['card'],
        });
            res.status(200).send(paymentIntent.client_secret);
            console.log(res, 'res')
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
}
    




module.exports ={
    getProducts,
    getProduct,
    getCompanies,
    getCompany, 
    updateProduct,
    createPayment
}