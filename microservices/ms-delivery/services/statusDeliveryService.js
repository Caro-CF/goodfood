const StatusDelivery = require('../models/statusDeliveryModel.js');

class StatusDeliveryService {
  async getAllStatusDeliveries() {
    try {
      const statusDeliveries = await StatusDelivery.find().exec();
      return statusDeliveries;
    } catch (err) {
      throw new Error('Erreur lors de la récupération des statuts de livraison.');
    }
  }

  async getStatusDeliveryById(id){
    try {
      const statusDelivery = await StatusDelivery.findById(id).exec();
      if (!statusDelivery) {
        throw new Error('Statut non trouvé.');
      }
      return statusDelivery;
    } catch (err) {
      throw new Error('Erreur lors de la récupération du statut.');
    }
  }

  async createStatusDelivery(id, libelle){
    console.log(id, libelle);
    try{
      const statusDelivery = new StatusDelivery({
        id : id,
        libelle : libelle
      });
      const savedStatusDelivery = await statusDelivery.save();
      return savedStatusDelivery;
    }
    catch (error) {
      throw new Error('Erreur lors de la création du statut.');
    }
  }

  async updateStatusDelivery(id, data) {
    try {
      const updatedStatusDelivery = await StatusDelivery.findByIdAndUpdate(id, data, { new: true });
      return updatedStatusDelivery;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du statut');
    }
  }

  async deleteDelivery(id) {
    try {
      const delivery = await Delivery.findByIdAndDelete(id).exec();
      if (!delivery) {
        throw new Error('Statut non trouvé.');
      }
    } catch (err) {
      throw new Error('Erreur lors de la suppression du statut.');
    }
  }
}

module.exports = StatusDeliveryService;
