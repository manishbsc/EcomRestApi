const mongoose=require('mongoose')
const time = require('./../libs/timeLib');
const logger=require('./../libs/loggerlibs')
const shortid = require('shortid');
const response=require('./../libs/responseLib')     


let helloWorldFunction=(req,res)=>res.send('Hello World')
let printExample=(req,res)=>res.send('Print')

//program starts here

const product=mongoose.model('Product')


let viewAll=(req,res)=>{
    //it will search for all data
    product.find({},(err,result)=>{
        if(err){
            logger.error("database error",'Product Controller',10)
            let apiResponse=response.generate(true,'Error Occured',200,err.message)
            res.send(apiResponse)
        }
        else if (result == undefined || result == null || result == '') {
            logger.error("No Product found error",'Product Controller',5)
            let apiResponse=response.generate(true,'No Product found',300,null)
            res.send(apiResponse)
        }
        else{
            logger.info("found",'Product Controoler',5)
            let apiResponse=response.generate(false,'All Product found',500,result)
            res.send(apiResponse)
          
        }
    })

}

/**
 * function to create the blog.
 */
   let createProduct = (req, res) => {
        var today = Date.now()
        let productId = shortid.generate()
    
        let newProduct = new product({
            productId : productId,
            productName : req.body.productName,
            prod_Description : req.body.prod_Description,
            price : req.body.price,
            discount : req.body.discount,
            rating : req.body.rating,
            category : req.body.category,
            brandName : req.body.brandName,
            quantity : req.body.quantity,
            payment_options : req.body.payment_options,
            netBanking : req.body.netBanking,
            COD : req.body.COD,
            EMI : req.body.EMI,
            warranty : req.body.warranty,
    
    
        }) // end new product model
    
    
        let colors = (req.body.colors != undefined && req.body.colors != null && req.body.colors != '') ? req.body.colors.split(',') : []
        newProduct.colors = colors
    
        let reviews = (req.body.reviews != undefined && req.body.reviews != null && req.body.reviews != '') ? req.body.reviews.split(',') : []
        newProduct.reviews = reviews
    
        let features = (req.body.features != undefined && req.body.features != null && req.body.features != '') ? req.body.features.split(',') : []
        newProduct.features = features
        
    
        newProduct.save((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err.message}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Failed to create product', 300, err.message)
                res.send(apiResponse)
            } else {
                logger.info('Details created/added successfully', 'Product Controller : createProduct')
                let apiResponse = response.generate(false, 'Product Details created/added successfully', 500, result)
                res.send(apiResponse)
            }
        }) // end new product save
    }

    /**
 * function to delete the assignment collection.
 */
let deleteProduct = (req, res) => {
    //remove is used todelete in model
    product.remove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            logger.error("Database Error Occured",'Product Controller',10)
            let apiResponse=response.generate(false,'Error occured',200,err.message)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error("Delete Error",'Product Controller',5)
            let apiResponse=response.generate(false,'Delete error',300,null)
            res.send(apiResponse)
        } else {
            logger.info("success",'Product Controller',5)
            let apiResponse=response.generate(false,'Product delete succesfull',500,result)
            res.send(apiResponse)

        }
    })
}


/**
 * function to edit blog by admin.
 */
let editProduct = (req, res) => {
    var today = time.getLocalTime()
    req.body.lastModified=today;
    let options = req.body;
    console.log(options);
    //update is used to update
    product.updateMany({ 'productId': req.params.productId }, options,(err, result) => {

        if (err) {
            logger.error("database error",'Product Controller',10)
            let apiResponse=response.generate(false,'Failed to edit product',200,null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error("No Product found",'Produt Controoler',10)
            let apiResponse=response.generate(false,' Edit Unsuccessfull',300,null)
            res.send(apiResponse)
        } else {
            logger.info("success",'Product Controller',5)
                    let apiResponse=response.generate(false,'Product Details edited/updated successfully',500,result)
                    res.send(apiResponse)
                

            }
    })
}

//function to read single product by productID.

let viewByProductId = (req, res) => {
   
   if (req.params.productId == "undefined" || req.params.productId == null ||req.params.productId == '') {
       console.log('ID of Product should be passed')
       let apiResponse = response.generate(true, 'ID of Product is missing', 403, null)
       res.send(apiResponse)
   } else {

       product.findOne({ 'productId': req.params.productId }, (err, result) => {

           if (err) {
               console.log(err)
               logger.error(`Error occured : ${err}`, 'Database', 10)
               let apiResponse = response.generate(true, 'Error Occured', 200, null)
               res.send(apiResponse)
           } else if (result == undefined || result == null || result == '') {
               logger.info('No Product Found', 'Product Controller : viewByProductId')
               let apiResponse = response.generate(true, 'No Product Found with given ID', 300, null)
               res.send(apiResponse)
           } else {
               logger.info("Product found", "Product Controller : viewByProductId")
               let apiResponse = response.generate(false, 'Product Found Successfully', 500, result)
               res.send(apiResponse)
   
           }
       })
   }

  
}


//function to read single product by productName.

let viewByProductName = (req, res) => {
        product.findOne({ 'productName': req.params.productName }, (err, result) => {
 
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, err.message)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.info('No Product Found', 'Product Controller : viewByProductId')
                let apiResponse = response.generate(true, 'No Product Found with given Name', 300, null)
                res.send(apiResponse)
            } else {
                logger.info("Product found", "Product Controller : viewByProductId")
                let apiResponse = response.generate(false, 'Product Found Successfully', 500, result)
                res.send(apiResponse)
    
            }
        })
    }
 
    

module.exports={
    helloWorldFunction:helloWorldFunction,
    printExample:printExample,
    viewAll:viewAll,
    createProduct:createProduct,
    deleteProduct:deleteProduct,editProduct:editProduct,
    viewByProductId:viewByProductId,
    viewByProductName:viewByProductName
}