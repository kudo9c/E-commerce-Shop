const cryptoJs = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Product = require("../models/Product")
const Order = require("../models/Order")
const User = require("../models/User")
const router = require("express").Router()

//CREATE
router.post("/",verifyToken,async (req,res) => {
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin,async (req,res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete(":id",verifyTokenAndAdmin, async (req,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET
router.get("/find/:id",verifyTokenAndAuthorization, async (req,res) => {
    
    try{
        const orders = await Order.find({userID: req.params.userId})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get("/",verifyTokenAndAdmin, async (req,res) => {
    const query = req.query.new
    try{
        const orders = query ? await Order.find().sort({_id: -1}).limit(5) : await Order.find()
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET MONTHLY INCOME
router.get("/income",verifyTokenAndAdmin,async (req,res) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try{
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: (new Date((new Date()).getTime() - (365 * 24 * 60 * 60 * 1000)))}},
                      ...(productId && {
                          products: {$elemMatch:{_id}}
                      })},
            {
                $project: {
                    month: {$month:"$createdAt"},
                    sales: "$total"
                }
            },
            {
                $group:{
                    _id: "$month",
                    total: { $sum: "$sales"},
                    count: {$sum: 1}
                }
            }
        ])
        res.status(200).json(income)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router