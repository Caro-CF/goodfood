import { Router } from 'express';
import DeliveryController from './controllers/deliveryController.js';
import StatusDeliveryController from './controllers/statusDeliveryController.js';
import DeliveryService from './services/deliveryService.js';
import StatusDeliveryService from './services/statusDeliveryService.js';
import pkg from 'mssql';
const { ConnectionPool } = pkg;
import config from './dbConfig.js';

const router = Router();

// Création d'une instance de service pour Delivery
const dataContext = new ConnectionPool(config);
const deliveryService = new DeliveryService(dataContext);
const deliveryController = new DeliveryController(deliveryService);

// Création d'une instance de service pour StatusDelivery
const statusDeliveryService = new StatusDeliveryService(dataContext);
const statusDeliveryController = new StatusDeliveryController(statusDeliveryService);

// Routes pour Delivery
router.get('/deliveries', deliveryController.getAllDeliveries.bind(deliveryController));
router.get('/deliveries/:id', deliveryController.getDeliveryById.bind(deliveryController));
router.post('/deliveries', deliveryController.createNewDelivery.bind(deliveryController));
router.put('/deliveries/:id', deliveryController.updateDelivery.bind(deliveryController));
router.delete('/deliveries/:id', deliveryController.deleteDelivery.bind(deliveryController));

// Routes pour StatusDelivery
router.get('/statusDeliveries', statusDeliveryController.getAllStatusDeliveries.bind(statusDeliveryController));

export default router;