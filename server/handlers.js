const companies = require("./data/companies.json");
const items = require("./data/items")


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
        res.status(200).json({
            status: 200,
            data: {
                ...productName,
                numInStock: req.body.numInStock
            }
        })
    
    }
}



module.exports ={
    getProducts,
    getProduct,
    getCompanies,
    getCompany, 
    updateProduct
}