const mongoose = require('mongoose')
const CategorySchema =  mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
            default: "https://via.palceholder.com/150",
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
);
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;