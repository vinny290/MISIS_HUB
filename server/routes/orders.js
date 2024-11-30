const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Создание нового заказа
router.post('/', orderController.createOrder);

// Получение всех заказов
router.get('/', orderController.getAllOrders);

// Обновление заказа
router.put('/:orderId', orderController.updateOrder);

// Удаление заказа
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;