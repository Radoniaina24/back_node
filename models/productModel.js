const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            ref: "Category",
            required: true,
        },
        sizes: {
            type: [String],
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        images: [
            {
                type: String,
                default: "https://via.palceholder.com/150",
                required: true
            },
        ],

        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],

        price: {
            type: Number,
            required: true,
        },

        totalQty: {
            type: Number,
            required: true,
        },
        totalSold: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
)
// Virtuals
//qty left
productSchema.virtual('qtyLeft').get(function(){
    const product = this
    return product.totalQty - product.totalSold
})
// Totale reviews
productSchema.virtual('totalReviews').get(function(){
    const product = this
    return product.reviews.length
})
// Moyenne
productSchema.virtual('averageRating').get(function(){
    let totaleRating = 0
    const product = this
    product.reviews.forEach((review)=> totaleRating += review.rating)
    const averageRating = Number(totaleRating/ product.reviews.length).toFixed()
    return averageRating
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product