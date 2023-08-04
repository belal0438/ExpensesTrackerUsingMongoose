const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/users');
const uniqid = require('uniqid');
const { json } = require('express');

var instance = new Razorpay({ key_id: 'rzp_test_XuNKusRbhfNdVc', key_secret: 'WyWJYHBIgLbfHyz9KhQ6mKDI' })

exports.purchasepremium = async (req, res) => {
    try {
        const amount = 2500;
        await instance.orders.create({
            amount: amount,
            currency: "INR",
            receipt: uniqid(),
        }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            // console.log(order);
            // res.json({order, Key_id:instance.key_id});

            orderValue = new Order({ orderId: order.id, status: "PENDING", userId: req.user._id });
            await orderValue.save();
            return res.status(201).json({ order, Key_id: instance.key_id });
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Somthing went wrong", error: err })
    }

}

exports.TransactionStatus = async (req, res, next) => {
    try {
        const { payment_id, order_id, status } = req.body;
        if (status === 'failed') {
            const promise1 = await Order.findOneAndUpdate(
                { orderId: order_id },
                { $set: { paymentid: payment_id, status: 'failed' } },
                { new: true }
            );
            // console.log(promise1);
            let promise2 = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $set: { ispremiumuser: true } },
                { new: true }
            );
            return res.status(500).json({ sucess: false, message: 'Transaction failed' })
        }
        else {
            const promise1 = await Order.findOneAndUpdate(
                { orderId: order_id },
                { $set: { paymentid: payment_id, status: 'SUCCESSFUL' } },
                { new: true }
            );
            // console.log(promise1);
            let promise2 = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $set: { ispremiumuser: true } },
                { new: true }
            );

            return res.status(202).json({ sucess: true, message: 'Transaction Successful' })
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

