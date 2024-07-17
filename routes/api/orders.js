/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const ordersRouter = require('express').Router();
const {
  OrderItem, Order, ModelSneaker, Size, Count, User, Mark, Status,
} = require('../../db/models');

ordersRouter.get('/statuses', async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(201).json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.get('/orders', async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        User,
        Status,
        { model: OrderItem, include: [Size, Count, { model: ModelSneaker, include: [Mark] }] },
      ],
    });
    const formattedOrders = allOrders.map((order) => ({
      id: order.id,
      user: order.User.name,
      status: order.Status.id,
      OrderItems: order.OrderItems.reduce((acc, item) => {
        const existingItem = acc.find((accItem) => accItem.name === item.ModelSneaker.name);
        if (existingItem) {
          existingItem.sizeCounts.push({
            size: item.Size.size,
            count: item.Count.count,
          });
        } else {
          acc.push({
            name: item.ModelSneaker.name,
            mark: item.ModelSneaker.Mark.name,
            sizeCounts: [{
              size: item.Size.size,
              count: item.Count.count,
            }],
          });
        }
        return acc;
      }, []),
    }));
    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.post('/orders', async (req, res) => {
  try {
    const { user, items } = req.body.data;

    let userInstance = await User.findOne({ where: { name: user } });
    if (!userInstance) {
      userInstance = await User.create({ name: user });
    }

    const newStatus = await Status.findOne({ where: { name: 'Новый' } });
    if (!newStatus) {
      return res.status(500).json({ message: 'Статус "Новый" не найден' });
    }

    const newOrder = await Order.create({
      user_id: userInstance.id,
      status_id: newStatus.id,
    });
    const orderItems = await Promise.all(items.map((item) => OrderItem.create({
      order_id: newOrder.id,
      model_id: item.model_id,
      size_id: item.size_id,
      count_id: item.count_id,
    })));

    return res.status(201).json({ order: newOrder, items: orderItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.put('/orders/status', async (req, res) => {
  try {
    const { orderId, statusId } = req.body;

    const orderInstance = await Order.findByPk(orderId);

    if (!orderInstance) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const statusInstance = await Status.findByPk(statusId);

    orderInstance.status_id = statusId;
    await orderInstance.save();

    res.status(200).json(orderInstance);
    if (!statusInstance) {
      return res.status(404).json({ message: 'Status not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = ordersRouter;
