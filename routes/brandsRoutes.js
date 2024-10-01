const asyncHandler = require('express-async-handler')
const express = require('express')
const brandRoutes = express.Router()
const brandsController = require('../controllers/brandsController')
const isLoggedIn = require("../middlewares/isLoggedIn");
brandRoutes.post('/register', isLoggedIn, asyncHandler(brandsController.createBrand))
brandRoutes.get('/', asyncHandler(brandsController.getAllBrands))
brandRoutes.get('/:id', asyncHandler(brandsController.getOneBrand))
brandRoutes.put('/update/:id', isLoggedIn,asyncHandler(brandsController.updateBrand))
brandRoutes.delete('/delete/:id', isLoggedIn,asyncHandler(brandsController.deleteBrand))

module.exports = brandRoutes