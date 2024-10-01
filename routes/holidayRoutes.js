const asyncHandler = require("express-async-handler");
const express = require("express");
const holidayRoutes = express.Router();
const holidaysController = require("../controllers/holidayController");
holidayRoutes.post("/register", asyncHandler(holidaysController.createHoliday));
holidayRoutes.get("/", asyncHandler(holidaysController.getAllHolidays));
holidayRoutes.get("/:id", asyncHandler(holidaysController.getOneHoliday));
holidayRoutes.put(
  "/update/:id",
  asyncHandler(holidaysController.updateHoliday)
);
holidayRoutes.delete(
  "/delete/:id",
  asyncHandler(holidaysController.deleteHoliday)
);

module.exports = holidayRoutes;
