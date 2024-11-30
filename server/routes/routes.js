const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Получение оптимального маршрута
router.post('/optimize', routeController.optimizeRoute);

module.exports = router;