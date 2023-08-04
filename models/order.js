
const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({

    paymentid: {
        type: String,
        default:null
    },
    orderId: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

module.exports = mongoose.model('Oder', OrderSchema)
