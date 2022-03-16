const cryptoJs = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Cart = require("../models/Cart")
const router = require("express").Router()

//CREATE
router.post("/",async (req,res) => {
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        res.status.toString(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization,async (req,res) => {
    try{
        const updatedCart = await Cart.findOneAndUpdate({userID: req.params.id}, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete(":id",verifyTokenAndAuthorization, async (req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET
router.get("/find/:id",verifyTokenAndAuthorization, async (req,res) => {
    try{
        const cart = await Cart.findOne({userID: req.params.id})
        if(cart) {
            res.status(200).json(cart)
        }
        else{
            res.status(401).json("Not found")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get("/",verifyTokenAndAdmin, async (req,res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router