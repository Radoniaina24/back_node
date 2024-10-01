const Color = require('../models/ColorModel')
async function createColor(req, res){
    const {name} = req.body
    try {
        const ColorExist = await Color.findOne({name})
        if(ColorExist) throw new Error("Color already exists")
        const color = await Color.create({
            name: name.toLowerCase(),
            user:req.userAuthId
        })
        res.json({
            status:"success",
            message:"Color created successfully",
            color
        })
    }catch(e){
        throw new Error(e.message)
    }
}
async function getAllColors(req, res) {
    const color = await Color.find()
    res.status(200).json({
        status: "success",
        message: "Colors fetched successfully",
        color
    })
}
async function getOneColor(req, res){
    const id = req.params.id
    try{
        const color = await Color.findById({_id : id})
        if(!color) throw new Error('Color not found')
        res.json({
            status:"success",
            message:"Color fetched successfully",
            color
        })
    }catch (e){
        throw new Error(e.message)
    }

}
async function updateColor(req, res){
    const id = req.params.id
    const {name} = req.body
    try{
        const color = await Color.findByIdAndUpdate(id, {
            name,
        }, {
            new: true
        })
        res.json({
            status:"success",
            message:"Color update successfully",
            color
        })
    }catch(e){
        throw new Error(e.message)
    }

}
async function deleteColor(req, res){
    const id = req.params.id
    try{
        const ColorExist =  await Color.findById(id)
        if(!ColorExist) throw new Error("Color not found")
        await Color.findByIdAndDelete(id)
        res.json({
            status:"success",
            message:"Color delete successfully",
        })
    }catch (e) {
        throw new Error(e.message)
    }
}
module.exports = {
    createColor,
    getAllColors,
    getOneColor,
    updateColor,
    deleteColor
}