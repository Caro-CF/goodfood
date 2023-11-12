// controllers/statusDeliveryController.js
const StatusDeliveryService = require('../services/statusDeliveryService.js');

class StatusDeliveryController {
  constructor() {
    this.statusDeliveryService = new StatusDeliveryService();
  }

  async getAllStatusDeliveries(req, res) {
    try {
      const statusDeliveries = await this.statusDeliveryService.getAllStatusDeliveries();
      res.json(statusDeliveries);
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la récupération des statuts."});
    }
  }

  async getStatusDeliveryById(req, res) {
    try {
      const id = req.params.id;
      await this.statusDeliveryService.getStatusDeliveryById(id);
      res.json(statusDelivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la récupération du statut."});
    }
  }

  async createStatusDelivery(req, res) {
    try {
      const { libelle } = req.body;
      await this.statusDeliveryService.createStatusDelivery(libelle);
      res.status(201).json({message: "Statut créé avec succès."});
    } catch (error) {
      console.error(error);
      res.status(500).json({erreur: "Erreur lors de la création du statut."});
    }
  }

  async updateStatusDelivery(req, res) {
    try {
      const { id } = req.params.id;
      const { libelle } = req.body;
      await this.statusDeliveryService.updateStatusDelivery(id, libelle);
      res.json({message: "Statut mis à jour avec succès."});
    } catch (error) {
      res.status(500).json({erreur: "Erreur lors de la mise à jour du statut."});
    }
  }

  async deleteStatusDelivery(req, res) {
    try {
      const { id } = req.params;
      await statusDeliveryService.deleteStatusDelivery(id);  
      res.json({message: "Statut supprimé avec succès."});
    } catch (error) {
      res.status(500).json({ erreur: "Erreur lors de la suppression du statut." });
    }
  }

  async getStatusDeliveryById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const statusDelivery = await this.statusDeliveryService.getStatusDeliveryById(id);

      res.json(statusDelivery);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async createStatusDelivery(req, res) {
    try {
      const { id, libelle } = req.body;
      await this.statusDeliveryService.createStatusDelivery(id, libelle);
      res.status(201).send('Statut créé avec succès');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }

  async updateStatusDelivery(req, res) {
    try {
      const { id } = req.params;
      const { libelle } = req.body;
      const updatedStatusDelivery = await statusDeliveryService.updateStatusDelivery(id, { libelle });
      res.json(updatedStatusDelivery);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating status delivery.' });
    }
  }

  async deleteStatusDelivery(req, res) {
    try {
      const { id } = req.params;
      const deletedStatusDelivery = await statusDeliveryService.deleteStatusDelivery(id);
      res.json(deletedStatusDelivery);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting status delivery.' });
    }
  }
}

module.exports = StatusDeliveryController;