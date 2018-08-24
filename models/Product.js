// importing mongoose module
const mongoose = require('mongoose')

const time = require('./../libs/timeLib');

// import schema 
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true,
            required:true
        },

        productName: {
            type: String,
            default: '',
            required:true
        },

        prod_Description: {
            type: String,
            default: 'Decription Not Available'
        },

        price: {
            type: Number,
            min : 10,
            default: 1
        },

        discount: {
            type: Number,
            min : 1,
            default: 1
        },

        rating: {
            type: Number,
            min:1,
            max:5,
        },

        category: {
            type:String,
            default:''
        },

        brandName: {
            type:String,
            default:''
        },

        colors: {
        type : [String],
        default : ''
        },


        payment_options : {
            netBanking :{
            type : Boolean,
            default : true
            },
            COD : {
            type : Boolean,
            default : false
            },
            EMI : {
            type : Boolean,
            default : false
            }

        },

        warranty: {
            type: String,
            min:1,
            default: 'No Warranty'
        },


        features: {
            type: [String],
            default: ''
        },


        reviews: {
        type : [String],
        date : Date.now,
        default : '' 
        },


        quantity: {
            type:Number,
            default:0
        },

        created: {
            type:Date,
            default:time.getLocalTime
        },

        lastModified: {
            type:Date,
            default:time.getLocalTime
        }
        

    }
)

mongoose.model('Product', productSchema);
