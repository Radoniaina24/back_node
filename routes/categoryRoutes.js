const asyncHandler = require('express-async-handler')
const express = require('express')
const categoriesRoutes = express.Router()
const categoriesController = require('../controllers/categoriesControllers')
const isLoggedIn = require("../middlewares/isLoggedIn");
categoriesRoutes.post('/register', isLoggedIn, asyncHandler(categoriesController.createCategory))
categoriesRoutes.get('/', asyncHandler(categoriesController.getAllCategories))
categoriesRoutes.get('/:id', asyncHandler(categoriesController.getOneCategory))
categoriesRoutes.put('/update/:id', isLoggedIn,asyncHandler(categoriesController.updateCategory))
categoriesRoutes.delete('/delete/:id', isLoggedIn,asyncHandler(categoriesController.deleteCategory))

module.exports = categoriesRoutes