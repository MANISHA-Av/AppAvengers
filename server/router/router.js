const express = require('express');
const router = express.Router();
require('../db/conn');
const User = require('../model/useschema');
const Book = require('../model/bookschema');
const Cart = require('../model/cartschema');
const MyOrder = require('../model/myorderschema');

//signup using promise
// router.post('/sign-up', (req, res) => {

//     const { fullname, username, email, password, confirmPassword } = req.body;
//     if (!fullname || !username || !email || !password || !confirmPassword) {
//         return res.status(422).json({ error: "plz fill all the field" });
//     }
//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already Exist" });
//             }
//             const user = new User({ fullname, username, email, password, confirmPassword });
//             user.save().then(() => {
//                 res.status(201).json({ message: "User registered successfully" });
//             }).catch((err) => res.status(500).json({ error: "resteration failed" }))
//         }).catch(err => { console.log(err); })
// })

//sign up using async await

router.post('/sign-up', async (req, res) => {
    const { fullname, username, email, password, confirmPassword } = req.body;
    if (!fullname || !username || !email || !password || !confirmPassword) {
        return res.status(422).json({ error: "plz fill all the field" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        }
        else if (password != confirmPassword) {
            return res.status(422).json({ error: "Password are not matching" });
        }
        else {
            const user = new User({ fullname, username, email, password, confirmPassword });

            await user.save();
            res.status(201).json({ message: "User registered successfully", data: user });
        }
    } catch (error) {
        console.log(error)
    }
})

//login route using promise

// router.post('/sign-in', (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ error: "Invalid data" });
//     }
//     const userLogin = User.findOne({ email: email });

//     console.log(userLogin)
// })


//routing using async

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Invalid data" });
        }
        const userLogin = await User.findOne({ email: email });
        console.log(userLogin)
        if (!userLogin) {
            res.status(400).json({ error: "User doesn't exist" });
        }
        else {
            if (userLogin.password === password) {
                res.status(200).json({ message: "User signedin successfully", data: userLogin });
            }
            else {
                res.status(400).json({ error: "Incorrect password" });
            }
        }
    } catch (error) {
        console.log(error);
    }
})

//insert books routing using async 
router.post('/insert-book', async (req, res) => {
    try {
        const books = await Book.insertMany(req.body);
        console.log(books);
    } catch (error) {
        console.log(error);
    }
})

//fetch book using async await
router.get('/fetch-booksDetail', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Book Details fetched", data: books });
        // console.log(books);
    } catch (error) {
        console.log(error);
    }
})

//add item to cart
router.post('/add-to-cart', async (req, res) => {
    const { email, productId } = req.body;
    try {
        const cart = await Cart.findOne({ email: email });
        console.log("cart", cart);
        if (cart === null) {
            const items = [];
            items.push({ productId: productId, count: 1 })
            const cart = new Cart({ email, items });
            await cart.save();
            res.status(200).json({ message: "Item added to cart", data: items });
        }
        else {
            const items = cart.items
            //search if the product id is already added
            let isFound = false;
            items.map((product) => {
                if (product.productId === productId) {
                    product.count = product.count + 1;
                    isFound = true;

                }
            })
            if (!isFound) {
                items.push({ productId: productId, count: 1 })
                await Cart.updateOne(
                    { email: email },
                    {
                        $push: {
                            "items": {
                                productId: productId,
                                count: 1
                            }
                        }
                    }
                );
            } else {
                await Cart.updateOne(
                    { email: email },
                    {
                        $set: {
                            "items": items
                        }
                    }
                );
            }

            res.status(200).json({ message: "Item added to cart", data: items });
        }
    } catch (error) {
        console.log(error)
    }
})

//fetch cart items for loggedin user
router.post('/fetch-cart', async (req, res) => {
    const { email } = req.body;
    try {
        const cart = await Cart.findOne({ email: email });
        if (cart === null) {
            res.status(200).json({ data: [] });
        }
        else {

            res.status(200).json({ data: cart.items });
        }
    } catch (error) {
        console.log(error)
    }
})

//place order routing
router.post('/place-order', async (req, res) => {
    const { email } = req.body
    try {
        const order = MyOrder(req.body);
        await order.save();
        //empty cart after the order has been placed
        await Cart.updateOne(
            { email: email },
            {
                $set: {
                    "items": []
                }
            }
        );
        res.status(200).json();

    } catch (error) {
        console.log(error)
    }
})

//fetch my order
router.post('/fetch-order', async (req, res) => {
    const { email } = req.body;
    try {
        const order = await MyOrder.find({ email: email });
        let orderedItem = [];
        order.map((item) => {
            orderedItem.push(item.items)
        })
        res.status(200).json({ data: orderedItem });
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;