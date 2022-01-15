const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required:true
    },
    authors: {
        type: [{ type: String }]
    },
    category: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    }
})

const Book = mongoose.model('BOOK', bookSchema);
module.exports = Book;