const express = require('express');
const Router = express.Router;
const DeliveryController = require('./controllers/deliveryController.js');
const StatusDeliveryController = require('./controllers/statusDeliveryController.js');
const DeliveryService = require('./services/deliveryService.js');
const StatusDeliveryService = require('./services/statusDeliveryService.js');

const router = Router();

// Création d'une instance de service pour Delivery
const deliveryService = new DeliveryService();
const deliveryController = new DeliveryController(deliveryService);

// Création d'une instance de service pour StatusDelivery
const statusDeliveryService = new StatusDeliveryService();
const statusDeliveryController = new StatusDeliveryController(statusDeliveryService);

// Routes pour Delivery
router.get('/deliveries', deliveryController.getAllDeliveries.bind(deliveryController));
router.get('/deliveries/:id', deliveryController.getDeliveryById.bind(deliveryController));
router.post('/deliveries', deliveryController.createNewDelivery.bind(deliveryController));
router.put('/deliveries/:id', deliveryController.updateDelivery.bind(deliveryController));
router.delete('/deliveries/:id', deliveryController.deleteDelivery.bind(deliveryController));

// Routes pour StatusDelivery
router.get('/status-deliveries', statusDeliveryController.getAllStatusDeliveries.bind(statusDeliveryController));
router.get('/status-deliveries/:id', statusDeliveryController.getStatusDeliveryById.bind(statusDeliveryController));
router.post('/status-deliveries', statusDeliveryController.createStatusDelivery.bind(statusDeliveryController));
router.put('/status-deliveries/:id', statusDeliveryController.updateStatusDelivery.bind(statusDeliveryController));
router.delete('/status-deliveries/:id', statusDeliveryController.deleteStatusDelivery.bind(statusDeliveryController));

module.exports = router;