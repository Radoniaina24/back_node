const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandsRoutes");
const colorRoutes = require("./routes/colorRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const orderRoutes = require("./routes/orderRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
const { globalErrHandler, notFound } = require("./middlewares/globaErrHandler");
const port = process.env.PORT;
dbConnect();
app.use(express.json());
//routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/holiday", holidayRoutes);
//Gestion des erreurs
app.use(notFound);
app.use(globalErrHandler);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
