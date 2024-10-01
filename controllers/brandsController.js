const Brand = require('../models/brandModel')
async function createBrand(req, res){
    const {name} = req.body
    try {
        const brandExist = await Brand.findOne({name})
        if(brandExist) throw new Error("Brand already exists")
        const brand = await Brand.create({
            name: name.toLowerCase(),
            user:req.userAuthId
        })
        res.json({
            status:"success",
            message:"Brand created successfully",
            brand
        })
    }catch(e){
        throw new Error(e.message)
    }
}
async function getAllBrands(req, res) {
    const brand = await Brand.find()
    res.status(200).json({
        status: "success",
        message: "Brands fetched successfully",
        brand
    })
}
async function getOneBrand(req, res){
    const id = req.params.id
    try{
        const brand = await Brand.findById({_id : id})
        if(!brand) throw new Error('Brand not found')
        res.json({
            status:"success",
            message:"Brand fetched successfully",
            brand
        })
    }catch (e){
        throw new Error(e.message)
    }

}
async function updateBrand(req, res){
    const id = req.params.id
    const {name} = req.body
    try{
        const brand = await Brand.findByIdAndUpdate(id, {
            name,
        }, {
            new: true
        })
        res.json({
            status:"success",
            message:"Brand update successfully",
            brand
        })
    }catch(e){
        throw new Error(e.message)
    }

}
async function deleteBrand(req, res){
    const id = req.params.id
    try{
        const brandExist =  await Brand.findById(id)
        if(!brandExist) throw new Error("Brand not found")
        await Brand.findByIdAndDelete(id)
        res.json({
            status:"success",
            message:"Brand delete successfully",
        })
    }catch (e) {
        throw new Error(e.message)
    }
}
module.exports = {
    createBrand,
    getAllBrands,
    getOneBrand,
    updateBrand,
    deleteBrand
}