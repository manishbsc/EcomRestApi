
//declare to use cartController
const cartController=require('./../controllers/cartController')
const appConfig=require('./../config/appConfig')
const auth=require('./../libs/auth')
//set rpouter function
let setRouter=(app)=>{
	//if hello then callback function
	
	//code for blocks start here
	let baseUrl = appConfig.apiVersion+'/ecom';
    
    app.post(baseUrl+'/cart/addProduct/:userId',auth.isAuthenticated,cartController.addProduct);
    
     /**
	 * @api {post} /api/v1/ecom/cart/addProduct/:userId Add product to the user's cart
	 * @apiVersion 0.0.1
	 * @apiGroup Add
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId product Id passed as a body parameter(Required)
	 * @apiParam {String} userId user Id passed as a URL parameter(Required)
	 * @apiParam {Number} quantity quantity of the product passed as a body parameter(optional)
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Added successfully",
            "status": 500,
            "data": {
                "quantity": Number,
                "_id": "String",
                "userId": "String",
                "productId": "String",
                "created": "date",
                "lastModified": "date",
                "-v":0
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 300,
	    "data": null
       }
       {
	    "error": true,
	    "message": " parameters missing",
	    "status": 200,
	    "data": null
       }
       {
	    "error": true,
	    "message": "product doesnot exist",
	    "status": 300,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/cart/view/all/:userId',auth.isAuthenticated,cartController.viewAll);
    
    
    /**
	 * @api {get} /api/v1/ecom/cart/view/all/:userId/viewcart View the all items from user's cart
	 * @apiVersion 0.0.1
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId user Id passed as a URL parameter(Required)
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Displaying Cart items",
            "status": 200,
            "data": [
                {
                    "_id": "String",
                    "quantity": Number,
                    "userId": "String",
                    "productId": "String",
                    "created": "date",
                    "lastModified": "date",
                    "__v": 0
                }
            ]
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 300,
	    "data": null
       }
       {
	    "error": true,
	    "message": "Cart is empty",
	    "status": 404,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/cart/delete/:productId/:userId',auth.isAuthenticated,cartController.deleteCart);
    
     /**
	 * @api {post} /api/v1/ecom/cart/delete/:productId/:userId Delete product from user's cart
	 * @apiVersion 0.0.1
	 * @apiGroup Delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId product Id passed as a URL parameter(Required)
	 * @apiParam {String} userId user Id passed as a URL parameter(Required)
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Product Deleted Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
       }
       {
	    "error": true,
	    "message": "Product delete Unsuccesfull",
	    "status": 404,
	    "data": null
	   }
	 */
        
}

module.exports={
    setRouter:setRouter
}