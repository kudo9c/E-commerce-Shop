const cryptoJs = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Product = require("../models/Product")
const Favor = require("../models/ListFavor")
const router = require("express").Router()

//CREATE
router.post("/",async (req,res) => {
    const newFavor = new Favor(req.body)
    try{
        const savedFavor = await newFavor.save()
        res.status(200).json(savedFavor)
    }catch(err){
        res.status.toString(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization,async (req,res) => {
    try{
        const updatedFavor = await Favor.findOneAndUpdate({userID: req.params.id}, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedFavor)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete(":id",verifyTokenAndAuthorization, async (req,res) => {
    try{
        await Favor.findByIdAndDelete(req.params.id)
        res.status(200).json("Favor has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET
router.get("/find/:id",verifyTokenAndAuthorization, async (req,res) => {
    try{
        const favor = await Favor.findOne({userID: req.params.id})
        res.status(200).json(favor)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get("/",verifyTokenAndAdmin, async (req,res) => {
    try{
        const favors = await Favor.find()
        res.status(200).json(favors)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router