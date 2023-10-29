const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

}, {
    versionKey: false,
});

module.exports = {
    PaymentModel: mongoose.model('Payment', Schema)
};