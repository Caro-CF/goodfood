const StatusDelivery = require('../models/statusDeliveryModel.js');

class StatusDeliveryService {
  async getAllStatusDeliveries() {
    try {
      return await StatusDelivery.find().exec();
    } catch (err) {
      throw new Error('Erreur lors de la récupération des statuts.');
    }
  }

  async getStatusDeliveryById(id){
    try {
      const statusDelivery = await StatusDelivery.findById(id).exec();
      return statusDelivery;
    } catch (err) {
      throw new Error('Erreur lors de la récupération du statut.');
    }
  }

  async createStatusDelivery(libelle){
    try{
      const statusDelivery = new StatusDelivery({
        libelle : libelle
      });
      return await statusDelivery.save();
    }
    catch (error) {
      throw new Error('Erreur lors de la création du statut.');
    }
  }

  async updateStatusDelivery(data) {
    try {
      return await StatusDelivery.findByIdAndUpdate(data, { new: true });
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du statut');
    }
  }

  async deleteStatusDelivery(id) {
    try {
      return await StatusDelivery.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new Error('Erreur lors de la suppression du statut.');
    }
  }
}

module.exports = StatusDeliveryService;
