// controllers/deliveryController.js

class DeliveryController {
  constructor(deliveryService) {
    this.deliveryService = deliveryService;
  }

  async getAllDeliveries(req, res) {
    try {
      const deliveries = await this.deliveryService.getAllDeliveries();
      res.json(deliveries);
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la récupération des livraisons."});
    }
  }

  async getDeliveryById(req, res) {
    try {
      const id = req.params.id;
      const delivery = await this.deliveryService.getDeliveryById(id);
      if(!delivery){
        res.status(500).json({erreur: "Livraison non trouvée."});
      };
      res.json(delivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la récupération de la livraison."});
    }
  }

  async createNewDelivery(req, res) {
    try {
      const { statusId, photo } = req.body;
      await this.deliveryService.createNewDelivery(statusId, photo);
      res.status(201).json({message: "Livraison créée avec succès."});
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la création de la livraison."});
    }
  }

  async updateDelivery(req, res) {
    try {
      const id = req.params.id;
      const { statusId, photo } = req.body;
      const updatedDelivery = await this.deliveryService.updateDelivery(id, statusId, photo);
      if(!updatedDelivery){
        res.status(500).json({erreur:"Livraison non trouvée."})
      }
      res.json({message: "Livraison mise à jour avec succès."});
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la mise à jour de la livraison."});
    }
  }

  async deleteDelivery(req, res) {
    try {
      const id = req.params.id;
      const deletedDelivery = await this.deliveryService.deleteDelivery(id);
      if(!deletedDelivery){
        res.status(500).json({erreur: "Livraison non trouvée."})
      }
      res.json({message: "Livraison supprimée avec succès."});
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la suppression de la livraison."});
    }
  }  
}

module.exports = DeliveryController;