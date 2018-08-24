// importing mongoose module
const mongoose = require('mongoose')

const time = require('./../libs/timeLib');

// import schema 
const Schema = mongoose.Schema;

let cartSchema = new Schema(
    {
        userId: {
            type:String,
            required:true
        },

        productId: {
            type:String,
            required:true,
        },
        
        quantity: {
            type:Number,
            default:1
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

mongoose.model('cart', cartSchema);