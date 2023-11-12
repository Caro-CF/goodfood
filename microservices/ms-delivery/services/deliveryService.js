const Delivery = require("../models/deliveryModel.js");

class DeliveryService {
  async getAllDeliveries() {
    try {
      return await Delivery.find().exec();
    } catch (err) {
      console.log(err);
      throw new Error('Erreur lors de la récupération des livraisons.');
    }
  }

  async getDeliveryById(id) {
    try {
      return await Delivery.findById(id).exec();
    } catch (err) {
      throw new Error('Erreur lors de la récupération de la livraison.');
    }
  }

  async createNewDelivery(statusId, photo) {
    try {
      const newDelivery = new Delivery({
        id_status: statusId,
        photo: photo
      });
      return await newDelivery.save();
    } catch (err) {
      console.log(err);
      throw new Error('Erreur lors de la création de la livraison.');
    }
  }

  async updateDelivery(id, statusId, photo) {
    try {
      return await Delivery.findByIdAndUpdate(
        id,
        { id_status: statusId, photo: photo },
        { new: true }
      ).exec();
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour de la livraison.');
    }
  }

  async deleteDelivery(id) {
    try {
      return await Delivery.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new Error('Erreur lors de la suppression de la livraison.');
    }
  }
}

module.exports = DeliveryService;