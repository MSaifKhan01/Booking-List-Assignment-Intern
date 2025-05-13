const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  address: String,
  pin: String,
  phone: String,
});

const formModel = mongoose.model('Form', formSchema);
module.exports={formModel}
