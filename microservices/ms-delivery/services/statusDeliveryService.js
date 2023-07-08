// services/statusDeliveryService.js
import StatusDelivery from '../models/statusDeliveryModel.js';
import pkg from 'mssql';
import config from '../dbConfig.js';

const { ConnectionPool } = pkg;

class StatusDeliveryService {
  constructor() {
    this.dataContext = new ConnectionPool(config);
  }

  async getAllStatusDeliveries() {
    try {
      await this.dataContext.connect();
      const result = await this.dataContext.request().query('SELECT * FROM StatusDelivery');
      return result.recordset.map((row) => new StatusDelivery(row.id, row.libelle));
    } catch (err) {
      throw new Error('Erreur lors de la récupération des statuts de livraison.');
    } finally {
      await this.dataContext.close();
    }
  }
}

export default StatusDeliveryService;