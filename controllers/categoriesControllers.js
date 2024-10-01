const Category = require('../models/categoryModel')
async function createCategory(req, res){
    const {name} = req.body
    try {
        const categoryExist = await Category.findOne({name})
        if(categoryExist) throw new Error("Category already exists")
        const category = await Category.create({
            name: name.toLowerCase(),
            user:req.userAuthId
        })
        res.json({
            status:"success",
            message:"Category created successfully",
            category
        })
    }catch (e){
        throw new Error(e.message)
    }
}
async function getAllCategories(req, res) {
    const categories = await Category.find()
    res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        categories
    })
}
async function getOneCategory(req, res){
    const id = req.params.id
    try{
        const category = await Category.findById({_id : id})
        if(!category) throw new Error('Category not found')
        res.json({
            status:"success",
            message:"Category fetched successfully",
            category
        })
    }catch (e){
        throw new Error(e.message)
    }

}
async function updateCategory(req, res){
    const id = req.params.id
    const {name} = req.body
    try{
        const category = await Category.findByIdAndUpdate(id, {
            name,
        }, {
            new: true
        })
        res.json({
            status:"success",
            message:"Category update successfully",
            category
        })
    }catch(e){
        throw new Error(e.message)
    }

}
async function deleteCategory(req, res){
    const id = req.params.id
    try{
        const categoryExist =  await Category.findById(id)
        if(!categoryExist) throw new Error("Category not found")
        await Category.findByIdAndDelete(id)
        res.json({
            status:"success",
            message:"Category delete successfully",
        })
    }catch (e) {
        throw new Error(e.message)
    }
}
module.exports = {
    createCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
}