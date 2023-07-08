// services/deliveryService.js
import Delivery from '../models/deliveryModel.js';
import pkg from 'mssql';
import config from '../dbConfig.js';

const { ConnectionPool } = pkg;

class DeliveryService {
  constructor() {
    this.dataContext = new ConnectionPool(config);
  }

  async getAllDeliveries() {
    try {
      await this.dataContext.connect();
      const result = await this.dataContext.request().query('SELECT * FROM Delivery');
      return result.recordset.map((row) => new Delivery(row.id, row.id_order, row.id_status, row.photo));
    } catch (err) {
      throw new Error('Erreur lors de la récupération des livraisons.');
    } finally {
      await this.dataContext.close();
    }
  }

  async getDeliveryById(id) {
    try {
      await this.dataContext.connect();
      const result = await this.dataContext.request()
        .input('id', pkg.sql.Int, id)
        .query('SELECT * FROM Delivery WHERE id = @id');

      if (result.recordset.length === 0) {
        throw new Error('Livraison non trouvée.');
      }

      const row = result.recordset[0];
      return new Delivery(row.id, row.id_order, row.id_status, row.photo);
    } catch (err) {
      throw new Error('Erreur lors de la récupération de la livraison.');
    } finally {
      await this.dataContext.close();
    }
  }

  async createNewDelivery(orderId, statusId, photo) {
    try {
      await this.dataContext.connect();
      await this.dataContext.request()
        .input('orderId', pkg.sql.Int, orderId)
        .input('statusId', pkg.sql.Int, statusId)
        .input('photo', pkg.sql.Text, photo)
        .query('INSERT INTO Delivery (id_order, id_status, photo) VALUES (@orderId, @statusId, @photo)');
    } catch (err) {
      throw new Error('Erreur lors de la création de la livraison.');
    } finally {
      await this.dataContext.close();
    }
  }

  async updateDelivery(id, orderId, statusId, photo) {
    try {
      await this.dataContext.connect();
      const result = await this.dataContext.request()
        .input('id', pkg.sql.Int, id)
        .input('orderId', pkg.sql.Int, orderId)
        .input('statusId', pkg.sql.Int, statusId)
        .input('photo', pkg.sql.Text, photo)
        .query('UPDATE Delivery SET id_order = @orderId, id_status = @statusId, photo = @photo WHERE id = @id');

      if (result.rowsAffected[0] === 0) {
        throw new Error('Livraison non trouvée.');
      }
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour de la livraison.');
    } finally {
      await this.dataContext.close();
    }
  }

  async deleteDelivery(id) {
    try {
      await this.dataContext.connect();
      const result = await this.dataContext.request()
        .input('id', pkg.sql.Int, id)
        .query('DELETE FROM Delivery WHERE id = @id');

      if (result.rowsAffected[0] === 0) {
        throw new Error('Livraison non trouvée.');
      }
    } catch (err) {
      throw new Error('Erreur lors de la suppression de la livraison.');
    } finally {
      await this.dataContext.close();
    }
  }
}

export default DeliveryService;