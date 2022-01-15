const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

//hashing the password
// userSchema.pre('save', async function (next) {
//     console.log("hlo");
//     if (this.isModified('password')) {
//         this.password = bcrypt.hash(this.password, 12);
//         this.confirmPassword = bcrypt.hash(this.confirmPassword, 12);
//     }
//     next();
// })

const User = mongoose.model('USER', userSchema);
module.exports = User;