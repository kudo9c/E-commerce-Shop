const cryptoJs = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Value = require("../models/Value")
const router = require("express").Router()

//CREATE
router.post("/",verifyTokenAndAdmin,async (req,res) => {
    const newValue = new Value(req.body)
    try{
        const savedValue = await newValue.save()
        res.status(200).json(savedValue)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin,async (req,res) => {
    try{
        const value = await Value.findOne({productID: req.params.id})
        if(value) {
            const updatedValue = await Value.findOneAndUpdate({productID: req.params.id}, {
                $set: req.body
            },{new: true})
            res.status(200).json(updatedValue)
        }
        else {
            const newValue = new Value(req.body)
            try{
                const savedValue = await newValue.save()
                res.status(200).json(savedValue)
            }catch(err){
                res.status(500).json(err)
            }
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id",verifyTokenAndAdmin, async (req,res) => {
    try{
        await Value.findOneAndDelete({productID: req.params.id})
        res.status(200).json("Value has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET
router.get("/find/:id", async (req,res) => {
    const newValue = {
        productID: req.params.id,
        attributes: [
            {
                attributeID: "",
                label: "",
                value: ""
            }
        ]
    }
    try{
        const value = await Value.findOne({productID: req.params.id})
        if(value) {
            res.status(200).json(value)
        }
        else{
            res.status(200).json(newValue)
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get("/",verifyTokenAndAdmin, async (req,res) => {
    try{
        const value = await Value.find()
        res.status(200).json(value)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router