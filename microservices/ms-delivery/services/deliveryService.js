const Delivery = require("../models/deliveryModel.js");

class DeliveryService {
  async getAllDeliveries() {
    try {
      const deliveries = await Delivery.find().exec();
      return deliveries;
    } catch (err) {
      console.log(err);
      throw new Error('Erreur lors de la récupération des livraisons.');
    }
  }

  async getDeliveryById(id) {
    try {
      const delivery = await Delivery.findById(id).exec();
      if (!delivery) {
        throw new Error('Livraison non trouvée.');
      }
      return delivery;
    } catch (err) {
      throw new Error('Erreur lors de la récupération de la livraison.');
    }
  }

  async createNewDelivery(orderId, statusId, photo) {
    try {
      const newDelivery = new Delivery({
        id_order: orderId,
        id_status: statusId,
        photo: photo
      });
      await newDelivery.save();
    } catch (err) {
      console.log(err);
      throw new Error('Erreur lors de la création de la livraison.');
    }
  }

  async updateDelivery(id, orderId, statusId, photo) {
    try {
      const delivery = await Delivery.findByIdAndUpdate(
        id,
        { id_order: orderId, id_status: statusId, photo: photo },
        { new: true }
      ).exec();

      if (!delivery) {
        throw new Error('Livraison non trouvée.');
      }
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour de la livraison.');
    }
  }

  async deleteDelivery(id) {
    try {
      const delivery = await Delivery.findByIdAndDelete(id).exec();
      if (!delivery) {
        throw new Error('Livraison non trouvée.');
      }
    } catch (err) {
      throw new Error('Erreur lors de la suppression de la livraison.');
    }
  }
}

module.exports = DeliveryService;