const asyncHandler = require('express-async-handler')
const express = require('express')
const productRoutes = express.Router()
const productControllers = require("../controllers/productControllers")
const isLoggedIn = require("../middlewares/isLoggedIn");
productRoutes.post("/register", isLoggedIn, asyncHandler(productControllers.postProduct))
productRoutes.get("/", asyncHandler(productControllers.getAllProduct))
productRoutes.get("/:id", asyncHandler(productControllers.getOneProduct))
productRoutes.put("/update/:id", isLoggedIn,asyncHandler(productControllers.updateProduct))
productRoutes.delete("/delete/:id", isLoggedIn,asyncHandler(productControllers.deleteProduct))

module.exports = productRoutes



