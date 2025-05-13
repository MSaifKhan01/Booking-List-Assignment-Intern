const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const DB=  mongoose.connect(process.env.MONGO_URI)

module.exports = { DB };