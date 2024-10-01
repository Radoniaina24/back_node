const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const Brand = require('../models/brandModel')
const Color = require('../models/ColorModel')
async function postProduct(req, res){
    const {
        name,
        brand,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty
    } = req.body
    try {
        const productExists = await Product.findOne({name})
        if(productExists) throw new Error("Product already exists")
        const categoryFound = await Category.findOne({
            name: category
        })
        const brandFound = await Brand.findOne({
            name: brand
        })
        const colorFound = await Color.findOne({
            name:colors
        })
        if(!categoryFound){
            throw new Error("Category not Found, please create category first or check category name")
        }
        if(!brandFound){
            throw new Error("Brand not Found, please create brand first or check brand name")
        }
        if(!colorFound){
            throw new Error("Color not Found, please create color first or check color name")
        }

        const product = await new Product({
            name,
            brand,
            description,
            category,
            sizes,
            colors,
            user:req.userAuthId,
            price,
            totalQty
        })
        await product.save()
        //Push the product into category and brand
        categoryFound.products.push(product._id)
        brandFound.products.push(product._id)
        //resave
        categoryFound.save()
        brandFound.save()

        //send response
        res.status(201).json({
            status :"success",
            message:"product created successfully",
            product
        })
    }catch(e){
        throw new Error(e.message)
    }
}
async function getAllProduct(req, res) {
    let productQuery = Product.find()
    if (req.query.name) {
        productQuery = productQuery.find({
            name: {$regex: req.query.name, $options: "i"}
        })
    }
    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: {$regex: req.query.brand, $options: "i"}
        })
    }
    if (req.query.category) {
        productQuery = productQuery.find({
            category: {$regex: req.query.category, $options: "i"}
        })
    }
    if (req.query.colors) {
        productQuery = productQuery.find({
            colors: {$regex: req.query.colors, $options: "i"}
        })
    }
    if (req.query.sizes) {
        productQuery = productQuery.find({
            sizes: {$regex: req.query.sizes, $options: "i"}
        })
    }
    if (req.query.price) {
        const priceRange = req.query.price.split('-')
        productQuery = productQuery.find({
            price: {$gte: priceRange[0], $lte: priceRange[1]}
        })
    }
    //pagination
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const totale = await Product.countDocuments()
    productQuery = productQuery.skip(startIndex).limit(limit)

    //pagination results
    const pagination = {}
    if (endIndex < totale) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    // await
    const products = await productQuery
    res.status(200).json({
        status: "success",
        totale,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products
    })
}
async function getOneProduct(req, res){
    const id = req.params.id
    const product = await Product.findById(id).populate("reviews")
    if(!product) throw new Error('Product not found')
    res.json({
        status:"success",
        message:"Product fetched successfully",
        product
    })
}
async function updateProduct(req, res){
    const id = req.params.id
    const {
        name,
        brand,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty
    } = req.body
    const product = await Product.findByIdAndUpdate(id, {
        name,
        brand,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty
    }, {
        new: true
    })
    res.json({
        status:"success",
        message:"Product update successfully",
        product
    })
}
async function deleteProduct(req, res){
    const id = req.params.id
    await Product.findByIdAndDelete(id)
    res.json({
        status:"success",
        message:"Product delete successfully",
    })
}
module.exports = {
    postProduct,
    getAllProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}
