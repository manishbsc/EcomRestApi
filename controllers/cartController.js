const mongoose=require('mongoose')
const time = require('./../libs/timeLib');
const logger=require('./../libs/loggerlibs')
const shortid = require('shortid');
const response=require('./../libs/responseLib')

const cart=mongoose.model('cart')
const product=mongoose.model('Product')


let addProduct=(req,res)=>{

    if(!(req.body.productId) || !(req.params.userId)){
        logger.error(`Input missing`, 'parameter missing', 10)
        let apiResponse = response.generate(true, 'Parameter missing', 200, null)
        res.send(apiResponse)
    }
    else{
    product.findOne({ 'productId': req.body.productId }, (err, result) => {
        if (err) {
            logger.error(`database error`, 'database Error', 10)
            let apiResponse = response.generate(true, 'Parameter missing', 200, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error(`Product id not available`, 'product does not exist', 10)
            let apiResponse = response.generate(true, 'Product doesnot exist', 300,null)
            res.send(apiResponse)
        } else {
            logger.error(`Product id found`, 'product found calling another api', 10)
            addIt(req,res)
        }
      })
    }
  }

let addIt=(req,res)=>{     
            var today = time.getLocalTime()

            let cartItems = new cart({
                userId: req.params.userId,
                productId: req.body.productId,
                quantity: req.body.quantity,
                created: today,
                lastModified: today
            }) // end new blog model
            cartItems.save((err, result) => {
                if (err) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 300, null)
                   res.send(apiResponse)
                } else {
                    console.log('Success in Adding Product to cart')
                    let apiResponse = response.generate(false, 'Added Sucessfully', 500, result)
                    res.send(apiResponse)
                }
            })
        }

let deleteCart = (req, res) => {

            if (!(req.params.userId) || !(req.params.productId)) {
        
                console.log('userId or productId should be passed')
                let apiResponse = response.generate(true, 'userId or productId is missing', 403, null)
                res.send(apiResponse)
            } else {
               cart.deleteOne({ 'userId': req.params.userId, 'productId': req.params.productId } , (err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        res.send(apiResponse)
                    } else if (result == undefined || result == null || result == ''||result.n==0) {
                        console.log('Product Not Found.')
                        let apiResponse = response.generate(true, 'Product deletion unsucesfull.', 404, null)
                        res.send(apiResponse)
                    } else {
                        console.log('Product Deletion Success')
                        let apiResponse = response.generate(false, 'Product Deleted Successfully', 200, result)
                        res.send(apiResponse)
                    }
                })
            }
        }// end removeCart

        
let viewAll = (req, res) => {
   cart.find({ 'userId': req.params.userId })
        .select()
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Cart Controller: viewCart', 10)
                let apiResponse = response.generate(true, 'Error occured', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.info('Cart is empty ', 'Cart Controller: viewCart')
                let apiResponse = response.generate(true, 'Cart is empty', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Displaying Cart items', 200, result)
                res.send(apiResponse)
            }
        })
}// end viewCart



module.exports={
    addProduct:addProduct,
    deleteCart:deleteCart,
    viewAll:viewAll
}

