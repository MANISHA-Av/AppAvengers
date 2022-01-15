const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    items:[
        {
            productId:{
                type:Number,
                required:true
            },
            count:{
                type:Number,
                required:true
            }
        }
    ]
})

const Cart = mongoose.model('CART', cartSchema);
module.exports = Cart;