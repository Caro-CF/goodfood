const mongoose = require("mongoose");

const statusDeliverySchema = new mongoose.Schema({
  // id: {
  //   type: Number
  // },
  libelle: {
    type: String,
    required: true
  }
});

const StatusDelivery = mongoose.model("StatusDelivery", statusDeliverySchema);
module.exports = StatusDelivery;