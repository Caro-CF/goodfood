// controllers/deliveryController.js

class DeliveryController {
  constructor(deliveryService) {
    this.deliveryService = deliveryService;
  }

  async getAllDeliveries(req, res) {
    try {
      const deliveries = await this.deliveryService.getAllDeliveries();
      res.json(deliveries);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async getDeliveryById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const delivery = await this.deliveryService.getDeliveryById(id);

      res.json(delivery);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async createNewDelivery(req, res) {
    try {
      const { orderId, statusId, photo } = req.body;
      await this.deliveryService.createNewDelivery(orderId, statusId, photo);
      res.status(201).send('Livraison créée avec succès');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async updateDelivery(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { orderId, statusId, photo } = req.body;

      await this.deliveryService.updateDelivery(id, orderId, statusId, photo);
      res.send('Livraison mise à jour avec succès');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async deleteDelivery(req, res) {
    try {
      const id = parseInt(req.params.id);
      await this.deliveryService.deleteDelivery(id);
      res.send('Livraison supprimée avec succès');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async getAllStatusDeliveries(req, res) {
    try {
      const statusDeliveries = await this.deliveryService.getAllStatusDeliveries();
      res.json(statusDeliveries);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }
}

module.exports = DeliveryController;