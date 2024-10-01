const asyncHandler = require('express-async-handler')
const express = require('express')
const reviewsRoutes = express.Router()
const reviewsController = require('../controllers/reviewsController')
const isLoggedIn = require("../middlewares/isLoggedIn");
reviewsRoutes.post('/register/:productId', isLoggedIn, asyncHandler(reviewsController.createReview))
/*reviewsRoutes.get('/', asyncHandler(brandsController.getAllBrands))
reviewsRoutes.get('/:id', asyncHandler(brandsController.getOneBrand))
reviewsRoutes.put('/update/:id', isLoggedIn,asyncHandler(brandsController.updateBrand))
reviewsRoutes.delete('/delete/:id', isLoggedIn,asyncHandler(brandsController.deleteBrand))*/

module.exports = reviewsRoutes