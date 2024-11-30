// Модуль для работы с данными заказов (например, база данных)
const OrderModel = require('../models/orderModel');

// Создание нового заказа
exports.createOrder = (req, res) => {
  const newOrder = req.body;
  // Логика добавления заказа в базу данных
  OrderModel.create(newOrder)
    .then(order => res.status(201).json(order))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Получение всех заказов
exports.getAllOrders = (req, res) => {
  OrderModel.findAll()
    .then(orders => res.json(orders))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Обновление заказа
exports.updateOrder = (req, res) => {
  const { orderId } = req.params;
  const updatedData = req.body;
  OrderModel.update(orderId, updatedData)
    .then(order => res.json(order))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Удаление заказа
exports.deleteOrder = (req, res) => {
  const { orderId } = req.params;
  OrderModel.delete(orderId)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ error: err.message }));
};