/* eslint-disable linebreak-style */
const ordersRouter = require('express').Router();
const {
  OrderItem, Order, Mark, Size, Count,
} = require('../../db/models');

ordersRouter.get('/orders', async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Size, Count] },
      ],
    });
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = ordersRouter;
