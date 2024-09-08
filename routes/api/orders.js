/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const ordersRouter = require('express').Router();
const authenticateJWT = require('../../middlewares/jwt');
const bot = require('../../bot');

const {
  OrderItem,
  Order,
  ModelSneaker,
  Size,
  Count,
  User,
  Mark,
  Status,
  DeliveryType,
  DeliveryData,
  CountSize,
} = require('../../db/models');

ordersRouter.get('/statuses', async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(201).json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.get('/types/delivery', async (req, res) => {
  try {
    const types = await DeliveryType.findAll();
    res.status(201).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.get('/types/delivery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const type = await DeliveryType.findByPk(id);
    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.get('/orders', authenticateJWT, async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        User,
        Status,
        DeliveryType,
        DeliveryData,
        {
          model: OrderItem,
          include: [Size, Count, { model: ModelSneaker, include: [Mark] }],
        },
      ],
    });
    const formattedOrders = allOrders.map((order) => ({
      id: order.id,
      user: order.User.name,
      status: order.Status.id,
      deliveryInfo: {
        type: order.DeliveryType.name,
        fullName: order.DeliveryDatum.fullName,
        address: order.DeliveryDatum.address,
        phone: order.DeliveryDatum.phone,
      },
      OrderItems: order.OrderItems.reduce((acc, item) => {
        const existingItem = acc.find(
          (accItem) => accItem.name === item.ModelSneaker.name,
        );
        if (existingItem) {
          existingItem.sizeCounts.push({
            size: item.Size.size,
            count: item.Count.count,
          });
        } else {
          acc.push({
            name: item.ModelSneaker.name,
            mark: item.ModelSneaker.Mark.name,
            sizeCounts: [
              {
                size: item.Size.size,
                count: item.Count.count,
              },
            ],
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
    const { user, items, delivery } = req.body.data;

    const userInstance = await User.findOne({ where: { name: user } });
    if (!userInstance) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const newStatus = await Status.findOne({ where: { name: 'Новый' } });
    if (!newStatus) {
      return res.status(500).json({ message: 'Статус "Новый" не найден' });
    }

    const newOrder = await Order.create({
      user_id: userInstance.id,
      status_id: newStatus.id,
      delivery_type_id: delivery.type_id,
    });

    const deliveryData = {
      order_id: newOrder.id,
      fullName: delivery.data.fullName,
      address: delivery.data.address,
      phone: delivery.data.phoneNumber,
    };

    await DeliveryData.create(deliveryData);

    for (const item of items) {
      const selectCount = await Count.findOne({
        where: { count: item.count_id },
      });

      const countSize = await CountSize.findOne({
        where: {
          model_id: item.model_id,
          size_id: item.size_id,
        },
        include: {
          model: Count,
          as: 'Count',
        },
      });

      if (!countSize || countSize.Count.count < selectCount.count) {
        return res
          .status(400)
          .json({ message: 'Недостаточно товара на складе' });
      }

      const newCount = await Count.findOne({
        where: { count: countSize.Count.count - selectCount.count },
      });
      await CountSize.update(
        { count_id: newCount.id },
        { where: { size_id: item.size_id, model_id: item.model_id } },
      );

      await OrderItem.create({
        order_id: newOrder.id,
        model_id: item.model_id,
        size_id: item.size_id,
        count_id: selectCount.id,
      });
    }

    const message = 'Ваш заказ успешно создан, и наш менеджер с вами свяжется в ближайшее время.';
    await bot.sendMessage(userInstance.chatid, 'https://img.freepik.com/free-photo/3d-fox-cartoon-illustration_23-2151395236.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725753600&semt=ais_hybrid', { caption: message });

    return res.status(201).json({ order: newOrder, delivery: deliveryData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ordersRouter.put('/orders/status', authenticateJWT, async (req, res) => {
  try {
    const { orderId, statusId } = req.body;

    const orderInstance = await Order.findByPk(orderId);
    const userInstance = await User.findByPk(orderInstance.user_id);

    if (!orderInstance) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const statusInstance = await Status.findByPk(statusId);
    if (!statusInstance) {
      return res.status(404).json({ message: 'Status not found' });
    }

    let notificationMessage = '';

    if (statusInstance.name === 'Отклонен') {
      const orderItems = await OrderItem.findAll({
        where: { order_id: orderInstance.id },
        include: {
          model: Count,
          as: 'Count',
        },
      });

      for (const item of orderItems) {
        const countSize = await CountSize.findOne({
          where: {
            model_id: item.model_id,
            size_id: item.size_id,
          },
          include: {
            model: Count,
            as: 'Count',
          },
        });
        if (countSize) {
          const oldCount = await Count.findOne({
            where: { count: countSize.Count.count + item.Count.count },
          });
          await CountSize.update(
            { count_id: oldCount.id },
            {
              where: {
                model_id: countSize.model_id,
                size_id: countSize.size_id,
              },
            },
          );
        }
      }

      await OrderItem.destroy({
        where: { order_id: orderInstance.id },
      });

      await DeliveryData.destroy({
        where: { order_id: orderInstance.id },
      });

      await orderInstance.destroy();

      notificationMessage =
        'Ваш заказ был отменен. Надеемся на дальнейшее сотрудничество!';
      await bot.sendMessage(userInstance.chatid, 'https://img.freepik.com/free-photo/3d-fox-cartoon-illustration_23-2151395236.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725753600&semt=ais_hybrid', { caption: notificationMessage });

      return res.status(200).json({ message: 'Order has been deleted' });
    }

    orderInstance.status_id = statusId;
    await orderInstance.save();

    if (statusInstance.name === 'В работе') {
      notificationMessage =
        'Ваш заказ в работе. Мы уведомим вас, когда заказ будет завершён.';
    } else if (statusInstance.name === 'Выполнен') {
      notificationMessage =
        'Спасибо за ваш заказ! Ваш заказ выполнен. Надеемся, вам понравится наш продукт!';
    }

    await bot.sendMessage(userInstance.chatid, 'https://img.freepik.com/free-photo/3d-fox-cartoon-illustration_23-2151395236.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725753600&semt=ais_hybrid', { caption: notificationMessage });

    res.status(200).json(orderInstance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = ordersRouter;
