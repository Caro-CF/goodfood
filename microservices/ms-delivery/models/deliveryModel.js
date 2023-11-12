const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  // id_order: {
  //   type: Number,
  //   required: true
  // },
  id_status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StatusDelivery',
    required: true
  },
  photo: {
    type: String
  }
});

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;