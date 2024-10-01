const express = require('express')
const orderRouter = express.Router()
const asyncHandler = require('express-async-handler')
const isLoggedIn = require("../middlewares/isLoggedIn");
const orderController = require('../controllers/orderController')
orderRouter.post('/',isLoggedIn,asyncHandler(orderController.createOrder))

module.exports = orderRouter