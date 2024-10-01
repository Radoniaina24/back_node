const Holiday = require("../models/holidayModel");
async function createHoliday(req, res) {
  const { name, date, dayType } = req.body;
  const nameRegex = new RegExp(name, "i");
  const dateRegex = new RegExp(date, "i");
  try {
    const holidayExist = await Holiday.findOne({
      $or: [{ name: { $regex: nameRegex } }, { date: { $regex: dateRegex } }],
    });
    if (holidayExist) throw new Error("Holiday already exists");
    const holiday = await Holiday.create({
      name: name.toLowerCase(),
      date,
      dayType,
    });
    res.json({
      status: "success",
      message: "Holiday created successfully",
      holiday,
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
async function getAllHolidays(req, res) {
  const { page, limit, search } = req.query;

  const searchQuery = {};
  if (search) {
    searchQuery.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  const tolaleHoliday = await Holiday.countDocuments(searchQuery);

  const holiday = await Holiday.find(searchQuery)
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json({
    total: tolaleHoliday,
    status: "success",
    message: "Holidays fetched successfully",
    holiday,
  });
}
async function getOneHoliday(req, res) {
  const id = req.params.id;
  try {
    const holiday = await Holiday.findById({ _id: id });
    if (!holiday) throw new Error("Holiday not found");
    res.json({
      status: "success",
      message: "Holiday fetched successfully",
      holiday,
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
async function updateHoliday(req, res) {
  const id = req.params.id;
  const { name, date, dayType } = req.body;
  try {
    const holiday = await Holiday.findByIdAndUpdate(
      id,
      {
        name,
        date,
        dayType,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      message: "Holiday update successfully",
      holiday,
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
async function deleteHoliday(req, res) {
  const id = req.params.id;
  try {
    const holidayExist = await Holiday.findById(id);
    if (!holidayExist) throw new Error("Holiday not found");
    await Holiday.findByIdAndDelete(id);
    res.json({
      status: "success",
      message: "Holiday delete successfully",
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
module.exports = {
  createHoliday,
  getAllHolidays,
  getOneHoliday,
  updateHoliday,
  deleteHoliday,
};
