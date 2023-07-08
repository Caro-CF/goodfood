// models/deliveryModel.js
class Delivery {
  constructor(id, orderId, statusId, photo) {
    this.id = id;
    this.orderId = orderId;
    this.statusId = statusId;
    this.photo = photo;
  }
}

export default Delivery;