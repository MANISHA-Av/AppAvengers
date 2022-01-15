const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    items: [
        {
            productId: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: String,
        required:true
    }
})

const MyOrder = mongoose.model('ORDER', orderSchema);
module.exports = MyOrder;