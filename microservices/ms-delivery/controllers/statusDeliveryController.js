// controllers/statusDeliveryController.js
import StatusDeliveryService from '../services/statusDeliveryService.js';

class StatusDeliveryController {
  constructor() {
    this.statusDeliveryService = new StatusDeliveryService();
  }

  async getAllStatusDeliveries(req, res) {
    try {
      const statusDeliveries = await this.statusDeliveryService.getAllStatusDeliveries();
      res.json(statusDeliveries);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }
}

export default StatusDeliveryController;