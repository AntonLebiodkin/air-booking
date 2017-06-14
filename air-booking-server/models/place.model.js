const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    number: Number,
    class: {
        type: String,
        enum: ['economy', 'first', 'business']
    },
    available: { type: Boolean, required: true },
    price: Number,
    plusChild: Boolean
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;