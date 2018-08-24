
//declare to use productController
const productController=require('./../controllers/productController')
const appConfig=require('./../config/appConfig')
const auth=require('./../libs/auth')
//set rpouter function
let setRouter=(app)=>{
	//if hello then callback function
	//test code start here
	app.get('/Hello',productController.helloWorldFunction)
	app.get('/print',productController.printExample)
	//test code end here
	
	//code for blocks start here
	let baseUrl = appConfig.apiVersion+'/ecom';
	app.get(baseUrl+'/print',productController.printExample);

	app.post(baseUrl+'/product/create',auth.isAuthenticated,productController.createProduct);
   
	   /**
 * @api {post} /api/v1/ecom/product/create Create/Add new Product details
 * @apiVersion 0.0.1
 * @apiGroup Create
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header,Required)
 * @apiParam {String} productName Name of product passed as a body parameter(required)
 * @apiParam {String} prod_Description Description of product passed as a body parameter
 * @apiParam {Number} price Price of product passed as a body parameter(required)
 * @apiParam {Number} discount Discount on product passed as a body parameter
 * @apiParam {Number} rating Rating(1 to 5) of product passed as a body parameter
 * @apiParam {String} category Category of product passed as a body parameter
 * @apiParam {String} brandName Brand of product passed as a body parameter
 * @apiParam {String} colors Colors of product passed as a body parameter
 * @apiParam {Boolean} payment_options Payment options for product purchase passed as a body parameter
 * @apiParam {String} warranty Warranty of product passed as a body parameter
 * @apiParam {String} features features of product passed as a body parameter
 * @apiParam {String} reviews Reviews of product passed as a body parameter
 * @apiParam {Number} quantity Quantity of product passed as a body parameter
 * 
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product Details created/added successfully",
        "status": 500,
        "data": [
            {
                "payment_options": {
                    "netBanking": true,
                    "COD": false,
                    "EMI": false
                },
                "productName": "String",
                "prod_Description": "String",
                "price": Number,
                "discount": Number,
                "category": "String",
                "brandName": "String",
                "colors": [],
                "warranty": Number,
                "features": [],
                "reviews": [],
                "quantity": Number,
                "productId": "String",
                "rating": Number,
                "created": "date",
                "lastModified": "date"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Failed to create product",
    "status": 300,
    "data": error message
    }
 */

	
	app.get(baseUrl+'/product/view/all',auth.isAuthenticated,productController.viewAll);

	   /**
* @api {get} /api/v1/ecom/product/view/all View All Products
* @apiVersion 0.0.1
* @apiGroup Read
*
* @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header(Required))
*
*  @apiSuccessExample {json} Success-Response:
*  
{
  "error": false,
  "message": "All Product Found",
  "status": 500,
  "data": [
      {
          "payment_options": {
              "netBanking": true,
              "COD": false,
              "EMI": false
          },
          "productName": "String",
          "prod_Description": "String",
          "price": Number,
          "discount": Number,
          "category": "String",
          "brandName": "String",
          "colors": [],
          "warranty": Number,
          "features": [],
          "reviews": [],
          "quantity": Number,
          "productId": "String",
          "rating": Number,
          "created": "date",
		  "lastModified": "date",
		  "-v":0
      }
  ]
}
@apiErrorExample {json} Error-Response:
*
* {
"error": true,
"message": "Failed to find product details",
"status": 200,
"data": null
}
{
"error": true,
"message": "No Product Found",
"status": 300,
"data": null
}
*/
	app.post(baseUrl+'/product/delete/:productId',auth.isAuthenticated,productController.deleteProduct);
	
       /**
 * @api {post} /api/v1/ecom/product/delete/:productId Delete Product Details
 * @apiVersion 0.0.1
 * @apiGroup Delete
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)     
 * @apiParam {String} productId ID of product passed as a URL parameter(Required)
 *
 *  @apiSuccessExample {json} Success-Response:
        {
            "error": false,
            "message": "Product Deleted",
            "status": 500,
            "data": {
                "n": 1,
                "ok": 1
                }
        }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 200,
    "data": null
    }
    {
    "error": true,
    "message": "Delete error",
    "status": 300,
    "data": null
   }

 */


	app.get(baseUrl+'/product/view/id/:productId',auth.isAuthenticated,productController.viewByProductId)
	
	
    /**
 * @api {get} /api/v1/ecom/product/view/id/:productId Get Product Details by ID 
 * @apiVersion 0.0.1
 * @apiGroup Read
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)     
 * @apiParam {String} productId ID of product passed as a URL parameter(Required)
 * 
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product found Successfully",
        "status": 500,
        "data": [
            {
                "payment_options": {
                    "netBanking": true,
                    "COD": false,
                    "EMI": false
                },
                "productName": "String",
                "prod_Description": "String",
                "price": Number,
                "discount": Number,
                "category": "String",
                "brandName": "String",
                "colors": [],
                "warranty": Number,
                "features": [],
                "reviews": [],
                "quantity": Number,
                "productId": "String",
                "rating": Number,
                "created": "date",
                "lastModified": "date"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 200,
    "data": null
    }
    {
    "error": true,
    "message": "No Product Found with given ID",
    "status": 300,
    "data": null
   }

 */
	app.put(baseUrl+'/product/edit/:productId',auth.isAuthenticated,productController.editProduct);
	 
     /**
 * @api {put} /api/v1/ecom/product/edit/:productId Edit Product Details
 * @apiVersion 0.0.1
 * @apiGroup Edit
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)(Required)  
 * @apiParam {String} productId ID of product passed as a URL parameter(Required)
 * @apiParam {String} productName Name of product passed as a body parameter
 * @apiParam {String} prod_Description Description of product passed as a body parameter
 * @apiParam {Number} price Price of product passed as a body parameter
 * @apiParam {Number} discount Discount on product passed as a body parameter
 * @apiParam {Number} rating Rating(1 to 5) of product passed as a body parameter
 * @apiParam {String} category Category of product passed as a body parameter
 * @apiParam {String} brandName Brand of product passed as a body parameter
 * @apiParam {String} colors Colors of product passed as a body parameter
 * @apiParam {Boolean} payment_options Payment options for product purchase passed as a body parameter
 * @apiParam {String} warranty Warranty of product passed as a body parameter
 * @apiParam {String} features features of product passed as a body parameter
 * @apiParam {String} reviews Reviews of product passed as a body parameter
 * @apiParam {Number} quantity Quantity of product passed as a body parameter
 * 
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product Details edited/updated successfully",
        "status": 500,
        "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
        }
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Failed to edit product",
    "status": 500,
    "data": null
    }
    {
    "error": true,
    "message": "Edit Unsuccessfull",
    "status": 300,
    "data": null
   }

 */




	app.get(baseUrl+'/product/view/name/:productName',auth.isAuthenticated,productController.viewByProductName);
       /**
 * @api {get} /api/v1/ecom/product/view/name/:productName Get Product Details by Name
 * @apiVersion 0.0.1
 * @apiGroup Read
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)     
 * @apiParam {String} productName Name of product passed as a URL parameter(Required)
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product Found Successfully.",
        "status": 500,
        "data": [
            {
                "payment_options": {
                    "netBanking": true,
                    "COD": false,
                    "EMI": false
                },
                "productName": "String",
                "prod_Description": "String",
                "price": Number,
                "discount": Number,
                "category": "String",
                "brandName": "String",
                "colors": [],
                "warranty": Number,
                "features": [],
                "reviews": [],
                "quantity": Number,
                "productId": "String",
                "rating": Number,
                "created": "date",
                "lastModified": "date"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 200,
    "data": null
    }
    {
    "error": true,
    "message": "Product Not Found with given name",
    "status": 300,
    "data": null
   }

 */


}

module.exports={
    setRouter:setRouter
}