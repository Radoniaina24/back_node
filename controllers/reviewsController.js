const Reviews = require("../models/reviewsModel")
const Product = require("../models/productModel")
async function createReview(req, res){
    const {product, message, rating} = req.body
    const {productId} = req.params
    // verification si le produit existe
    const productFound = await Product.findById(productId)?.populate("reviews")
    // verification
    if(!productFound) throw new Error("Product Not Found")
    // verification si l'utilisateur a déja évaluer ce produit
    const hasReviewed =  productFound.reviews.find((review)=>{
        return review.user.toString() === req.userAuthId.toString()
    })
    if(hasReviewed){
        throw new Error("You have already reviewed this product")
    }

    const review = await Reviews.create({
        message,
        product : productFound?._id,
        rating,
        user: req.userAuthId
    })
    productFound.reviews.push(review?._id)
    await productFound.save()
    res.status(200).json({
        success:true,
        message:"Review created successfully",
        review
    })
}
module.exports = {
    createReview
}