/* eslint-disable linebreak-style */
const ordersRouter = require('express').Router();
const {
  OrderItem, Order, ModelSneaker, Size, Count, User, Mark,
} = require('../../db/models');

ordersRouter.get('/orders', async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        User,
        { model: OrderItem, include: [Size, Count, { model: ModelSneaker, include: [Mark] }] },
      ],
    });
    const formattedOrders = allOrders.map((order) => ({
      id: order.id,
      user: order.User.name,
      status: order.status,
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
      userInstance = await User.create({
        name: user,
      });
    }
    const newOrder = await Order.create({
      user_id: userInstance.id,
    });
    const orderFinish = items.forEach((item) => {
      OrderItem.create({
        order_id: newOrder.id,
        model_id: item.model_id,
        size_id: item.size_id,
        count_id: item.count_id,
      });
    });
    return res.status(201).json(orderFinish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = ordersRouter;
