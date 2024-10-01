const asyncHandler = require('express-async-handler')
const express = require('express')
const colorRoutes = express.Router()
const colorsController = require('../controllers/colorsController')
const isLoggedIn = require("../middlewares/isLoggedIn");
colorRoutes.post('/register', isLoggedIn, asyncHandler(colorsController.createColor))
colorRoutes.get('/', asyncHandler(colorsController.getAllColors))
colorRoutes.get('/:id', asyncHandler(colorsController.getOneColor))
colorRoutes.put('/update/:id', isLoggedIn,asyncHandler(colorsController.updateColor))
colorRoutes.delete('/delete/:id', isLoggedIn,asyncHandler(colorsController.deleteColor))

module.exports = colorRoutes