const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const express = require("express");
const router = express.Router();

// list of orders
router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 }); // sort from newest to oldest

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

// get order by id
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: { path: "category", select: "name" },
        select: "name price", // only show selected fields
      },
    });
  // if want to populate somnething in something use path

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
});

// create an order
router.post("/", async (req, res) => {
  // create the orderItems in database
  const orderItemsId = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  // this is promised because the data is being created in database
  const orderItemsIdsResolved = await orderItemsId;

  // calculate total price coming from database
  const totalOrderPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  // return a promise so put await,
  // array of prices
  // console.log(totalOrderPrices);

  const totalPrice = totalOrderPrices.reduce((a, b) => a + b, 0); // combine every itel

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) return res.status(404).send("the order cannot be created!");

  res.send(order);
});

// modify orders - status
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true, // return updated data
    }
  );

  if (!order) return res.status(404).send("the order cannot be modified!");

  res.send(order);
});

// delete
router.delete("/:id", async (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        // delete order items in database too
        await order.orderItems.map(async (orderItem) => {
          // wait for every item to be deleted
          await OrderItem.findByIdAndRemove(orderItem); // cat put then to catch error
        });
        return res.status(200).json({
          success: true,
          message: "the order is deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "order not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// get total sales
router.get("/get/totalSales", async (req, res) => {
  // use mangoose func aggregate
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    // we have to put id bcs mangoose cannot return item without id
  ]);

  if (!totalSales)
    return res.status(400).send("The order sales cannot be generated");

  res.send({ totalSales: totalSales.pop().totalSales }); // pop the only item
});

// get number of order in collection
router.get("/get/count", async (req, res) => {
  const orderCount = await Order.countDocuments();

  if (!orderCount) {
    res.status(500).json({ success: false });
  }

  res.send({ orderCount: orderCount });
});

module.exports = router;
