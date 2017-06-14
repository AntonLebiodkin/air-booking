const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
    city: String,
    country: String,
    country_ISO: String,
    time: Date
});

const Destination = mongoose.model('Destination', DestinationSchema);
module.exports = Destination;