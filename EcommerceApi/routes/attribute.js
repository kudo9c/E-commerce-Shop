const cryptoJs = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Attribute = require("../models/Attribute")
const router = require("express").Router()

//CREATE
router.post("/",verifyTokenAndAdmin,async (req,res) => {
    const newAttribute = new Attribute(req.body)
    try{
        const savedAttribute = await newAttribute.save()
        res.status(200).json(savedAttribute)
    }catch(err){
        res.status.toString(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin,async (req,res) => {
    try{
        const updatedAttribute = await Attribute.findOneAndUpdate({userID: req.params.id}, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedAttribute)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete(":id",verifyTokenAndAdmin, async (req,res) => {
    try{
        await Attribute.findByIdAndDelete(req.params.id)
        res.status(200).json("Attribute has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET
router.get("/find/:id", async (req,res) => {
    try{
        const attr = await Attribute.findOne({label: req.params.id})
        if(attr) {
            res.status(200).json(attr)
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
        const atts = await Attribute.find()
        res.status(200).json(atts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router